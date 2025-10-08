-- Dealers table
create table if not exists public.dealers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text not null unique,
  name text,
  phone text,
  company text,
  created_at timestamp with time zone default now()
);

-- Items table (catalog)
create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  sku text unique,
  name text not null,
  description text,
  price_cents integer not null default 0,
  image_url text,
  created_at timestamp with time zone default now()
);

-- Orders table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  dealer_id uuid not null references public.dealers(id) on delete cascade,
  project_name text,
  ship_to text,
  city text,
  state text,
  zip text,
  contact text,
  phone text,
  notes text,
  status text not null default 'pending',
  created_at timestamp with time zone default now()
);

-- Order items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  item_id uuid not null references public.items(id),
  quantity integer not null default 1,
  price_cents integer not null default 0
);

-- RLS
alter table public.dealers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.items enable row level security;

-- Admin role via JWT claim `role` = 'admin' or email match
create policy dealers_select on public.dealers for select
  using (auth.role() = 'authenticated');

create policy dealers_self on public.dealers for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy items_read on public.items for select using (true);

create policy orders_read on public.orders for select using (
  exists (select 1 from public.dealers d where d.id = orders.dealer_id and d.user_id = auth.uid())
);

create policy orders_write on public.orders for insert with check (
  exists (select 1 from public.dealers d where d.id = dealer_id and d.user_id = auth.uid())
);

create policy order_items_rw on public.order_items for all using (
  exists (
    select 1 from public.orders o
    join public.dealers d on d.id = o.dealer_id
    where o.id = order_items.order_id and d.user_id = auth.uid()
  )
) with check (
  exists (
    select 1 from public.orders o
    join public.dealers d on d.id = o.dealer_id
    where o.id = order_items.order_id and d.user_id = auth.uid()
  )
);
