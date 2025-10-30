# 🛡️ Admin Dashboard - Complete Management System

## Overview

The Admin Dashboard is a comprehensive management interface for administrators to oversee the entire PlaySport Courts platform. It provides full CRUD capabilities for products, users, dealers, and orders with real-time tracking and analytics.

## 🎯 Features

### 1. Dashboard Tab
- **Real-time Statistics**: Revenue, orders, users, products
- **Trend Indicators**: Month-over-month growth percentages
- **Recent Activity Feed**: Latest actions across the platform
- **Quick Overview**: Pending orders, active dealers, active products

### 2. Product Management Tab
- **View All Products**: Grid layout with product cards
- **Add New Products**: Create products with full details
- **Edit Products**: Update name, description, pricing, colors, features
- **Delete Products**: Remove products from catalog
- **Active/Inactive Toggle**: Control product visibility to dealers
- **Pricing Management**: Set and update price per square foot
- **Color Management**: Add/remove available colors
- **Feature Management**: Add/remove product features

### 3. User & Dealer Management Tab
- **User Statistics**: Total users, dealers, admins
- **Search Users**: Filter by email
- **Role Filter**: Filter by dealer/admin role
- **Change User Role**: Promote/demote between dealer and admin
- **Suspend/Activate**: Control user account status
- **View User Metrics**: Orders placed, total spent
- **Delete Users**: Remove user accounts

### 4. Order Management Tab
- **Order Statistics**: Total orders, pending, processing, revenue
- **Advanced Filtering**: Search, status filter, payment filter
- **Update Order Status**: Change between pending/processing/completed/cancelled
- **Update Payment Status**: Manage paid/pending/failed payments
- **View Order Details**: Full order information modal
- **Export Orders**: Export order data (button ready)
- **Real-time Tracking**: See all order updates

## 🚀 Quick Start

### Access Requirements

**Admin Credentials:**
- Email: `admin@gmail.com`
- Password: `password123`

### Accessing the Dashboard

1. Navigate to `/admin`
2. Sign in with admin credentials
3. You'll be redirected to the main dashboard

### Navigation

The dashboard uses a tab-based navigation system:
- **Dashboard**: Overview and statistics
- **Products**: Manage product catalog
- **Users & Dealers**: Manage user accounts
- **Orders**: Track and manage orders

## 📦 Product Management

### Adding a New Product

1. Navigate to **Products** tab
2. Click **"Add Product"** button
3. Fill in the form:
   - **Product Name** (required)
   - **Description** (required)
   - **Price per Sq Ft** (required)
   - **Colors**: Click "Add Color" to add available colors
   - **Features**: Click "Add Feature" to add product features
   - **Active**: Check to make visible to dealers
4. Click **"Save Product"**

### Editing a Product

1. Find the product in the grid
2. Click **"Edit"** button
3. Update any fields
4. Click **"Save Product"**

### Deleting a Product

1. Find the product in the grid
2. Click the **trash icon**
3. Confirm deletion

### Product Data Structure

```typescript
{
  id: "unique-id",
  name: "Product Name",
  description: "Product description",
  pricePerSqFt: 9.99,
  colors: ["Color 1", "Color 2"],
  features: ["Feature 1", "Feature 2"],
  active: true
}
```

## 👥 User Management

### User Statistics

View at the top of the Users tab:
- **Total Users**: All registered users
- **Dealers**: Users with dealer role
- **Admins**: Users with admin role

### Searching Users

Use the search bar to filter users by email in real-time.

### Changing User Roles

1. Find the user in the table
2. Use the **Role** dropdown
3. Select "Dealer" or "Admin"
4. Change is saved automatically

### Suspending/Activating Users

1. Find the user in the table
2. Click the **Status** badge
3. Toggles between "active" and "suspended"

### Deleting Users

1. Find the user in the table
2. Click the **trash icon** in the Actions column
3. Confirm deletion

### User Data Structure

```typescript
{
  email: "user@example.com",
  role: "dealer" | "admin",
  createdAt: timestamp,
  lastLogin: timestamp,
  orders: 5,
  totalSpent: 1234.56,
  status: "active" | "suspended"
}
```

## 📦 Order Management

### Order Statistics

View key metrics:
- **Total Orders**: All orders placed
- **Pending**: Orders awaiting processing
- **Processing**: Orders being fulfilled
- **Total Revenue**: Sum of paid orders

### Filtering Orders

**Search**: Filter by dealer email, project name, or order ID

**Status Filter**:
- All Status
- Pending
- Processing
- Completed
- Cancelled

**Payment Filter**:
- All Payments
- Paid
- Pending
- Failed

### Updating Order Status

1. Find the order in the table
2. Use the **Status** dropdown
3. Select new status:
   - **Pending**: Order received, not yet started
   - **Processing**: Order being fulfilled
   - **Completed**: Order finished and delivered
   - **Cancelled**: Order cancelled

### Updating Payment Status

1. Find the order in the table
2. Use the **Payment** dropdown
3. Select payment status:
   - **Paid**: Payment successful
   - **Pending**: Payment processing
   - **Failed**: Payment failed

### Viewing Order Details

1. Click on any order row (or "View Details")
2. Modal shows:
   - Order information (dealer, date, items, total)
   - Shipping address
   - Individual items with colors, quantities, prices
   - Stripe session ID (if available)

### Exporting Orders

Click the **"Export"** button to download order data (ready for implementation).

### Order Data Structure

```typescript
{
  id: "ord_xxx",
  dealerEmail: "dealer@example.com",
  projectName: "Project Name",
  status: "pending" | "processing" | "completed" | "cancelled",
  paymentStatus: "paid" | "pending" | "failed",
  total: 1234.56,
  itemCount: 3,
  createdAt: timestamp,
  items: [
    {
      productName: "Game Tile",
      color: "Royal Blue",
      quantity: 200,
      price: 8.99
    }
  ],
  shipping: {
    address: "123 Main St",
    city: "Atlanta",
    state: "GA",
    zip: "30303"
  },
  stripeSessionId: "cs_xxx"
}
```

## 📊 Dashboard Analytics

### Statistics Cards

**Total Revenue**:
- Sum of all paid orders
- Month-over-month growth percentage
- Trend indicator (up/down)

**Total Orders**:
- Count of all orders
- Growth percentage
- Trend indicator

**Total Users**:
- All registered users (dealers + admins)
- Growth percentage
- Trend indicator

**Active Products**:
- Count of products with `active: true`
- Available to dealers

### Recent Activity Feed

Shows the latest actions:
- **Order Activities**: New orders, completed orders
- **User Activities**: New registrations, role changes
- **Product Activities**: Product updates, new products

Each activity shows:
- Type icon (color-coded)
- Description message
- User email (if applicable)
- Timestamp

### Quick Overview

Real-time counts:
- Pending Orders (yellow)
- Processing Orders (blue)
- Active Dealers (green)
- Active Products (orange)

## 🎨 UI Components

### Color-Coded Status Indicators

**Order Status:**
- 🟡 **Pending** - Yellow
- 🔵 **Processing** - Blue
- 🟢 **Completed** - Green
- 🔴 **Cancelled** - Red

**Payment Status:**
- 🟢 **Paid** - Green
- 🟡 **Pending** - Yellow
- 🔴 **Failed** - Red

**User Status:**
- 🟢 **Active** - Green
- 🔴 **Suspended** - Red

### Interactive Elements

- **Hover Effects**: Cards lift on hover
- **Click Animations**: Buttons show press effect
- **Loading States**: Smooth transitions
- **Modal Overlays**: Backdrop blur for order details

## 🔐 Security & Permissions

### Admin-Only Access

The dashboard checks for admin role:
```typescript
if (!isAdmin(user)) {
  router.push("/dealer-portal");
}
```

### Access Denied Screen

Non-admin users see:
- Shield icon with red color
- "Access Denied" message
- Link to dealer portal

### Route Protection

Admin routes are protected:
- Check user role on page load
- Redirect non-admins automatically
- Session-based authentication

## 🔧 Technical Implementation

### State Management

**Products State:**
- Initialized from `PRODUCT_CATALOG`
- CRUD operations update local state
- Ready for API integration

**Users State:**
- Mock data with sample dealers/admins
- Role and status management
- Ready for database integration

**Orders State:**
- Mock orders with full details
- Status and payment tracking
- Ready for Stripe webhook integration

### Component Architecture

```
admin/page.tsx (Main orchestrator)
  ├── AdminStats (Statistics cards)
  ├── RecentActivity (Activity feed)
  ├── ProductManager (Product CRUD)
  ├── UserManager (User management)
  └── OrderManager (Order tracking)
```

### Data Flow

1. **Admin page** maintains state
2. **Child components** receive data as props
3. **Handlers** passed down for updates
4. **State updates** trigger re-renders

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px - Stacked layout
- **Tablet**: 640px - 1024px - 2-column grid
- **Desktop**: > 1024px - 3-4 column grid

### Mobile Optimizations

- Horizontal scroll for tables
- Stacked filters on mobile
- Touch-friendly buttons (44px min)
- Collapsible details

## 🚀 Production Readiness

### Current Status: Development

**Mock Data:**
- ⚠️ Products from `PRODUCT_CATALOG`
- ⚠️ Users in component state
- ⚠️ Orders in component state

**Ready for Production:**
1. Replace mock data with API calls
2. Connect to database (PostgreSQL/Supabase)
3. Implement real-time updates (WebSockets)
4. Add export functionality
5. Add pagination for large datasets
6. Implement search optimization

### Database Schema Needed

**Products Table:**
```sql
CREATE TABLE products (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price_per_sqft DECIMAL(10, 2),
  colors TEXT[], -- JSON array
  features TEXT[], -- JSON array
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Users Table:**
```sql
CREATE TABLE users (
  email VARCHAR PRIMARY KEY,
  role VARCHAR CHECK (role IN ('dealer', 'admin')),
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  status VARCHAR CHECK (status IN ('active', 'suspended')),
  orders_count INT DEFAULT 0,
  total_spent DECIMAL(10, 2) DEFAULT 0
);
```

**Orders Table:**
```sql
CREATE TABLE orders (
  id VARCHAR PRIMARY KEY,
  dealer_email VARCHAR REFERENCES users(email),
  project_name VARCHAR,
  status VARCHAR CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  payment_status VARCHAR CHECK (payment_status IN ('paid', 'pending', 'failed')),
  total DECIMAL(10, 2),
  item_count INT,
  items JSONB, -- Order items as JSON
  shipping JSONB, -- Shipping address as JSON
  stripe_session_id VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes Needed

**Product API:**
```
GET    /api/admin/products       - List all products
POST   /api/admin/products       - Create product
PUT    /api/admin/products/:id   - Update product
DELETE /api/admin/products/:id   - Delete product
```

**User API:**
```
GET    /api/admin/users          - List all users
PUT    /api/admin/users/:email   - Update user
DELETE /api/admin/users/:email   - Delete user
```

**Order API:**
```
GET    /api/admin/orders         - List all orders
PUT    /api/admin/orders/:id     - Update order
GET    /api/admin/orders/:id     - Get order details
POST   /api/admin/orders/export  - Export orders
```

## 🎯 Feature Roadmap

### Phase 1 (Current) ✅
- Admin authentication
- Product CRUD interface
- User management
- Order tracking
- Dashboard analytics

### Phase 2 (Next)
- Database integration
- Real-time updates
- Email notifications
- Export functionality
- Advanced filtering
- Pagination

### Phase 3 (Future)
- Bulk operations
- Advanced analytics
- Revenue charts
- Inventory management
- Audit logging
- Activity history

## 📞 Usage Guide

### Daily Operations

**Morning Routine:**
1. Check dashboard for pending orders
2. Review recent activity
3. Process any new orders

**Order Processing:**
1. Go to Orders tab
2. Filter for "Pending" status
3. Review order details
4. Update status to "Processing"
5. Fulfill order
6. Update status to "Completed"

**User Management:**
1. Monitor new dealer registrations
2. Verify dealer credentials
3. Approve or suspend as needed

**Product Updates:**
1. Update pricing as needed
2. Add new products
3. Toggle inactive products

## 🐛 Troubleshooting

### Can't Access Admin Dashboard

**Solution**: Login with admin credentials:
- Email: `admin@gmail.com`
- Password: `password123`

### Changes Not Saving

**Current Limitation**: Data is stored in component state (resets on refresh). In production, connect to database.

### Orders Not Showing

**Check**: Make sure you're logged in as admin. Dealer role doesn't have access to admin dashboard.

## 🎓 Best Practices

### Security

1. Always verify admin role before showing sensitive data
2. Implement rate limiting on admin endpoints
3. Log all admin actions for audit trail
4. Use HTTPS in production
5. Implement CSRF protection

### Performance

1. Implement pagination for large datasets (>100 items)
2. Use debounced search
3. Lazy load order details
4. Cache frequently accessed data
5. Optimize database queries

### User Experience

1. Provide clear feedback for all actions
2. Use loading states during operations
3. Confirm destructive actions (delete)
4. Auto-save when possible
5. Show clear error messages

## 📚 Additional Resources

- **Stripe Integration**: See `STRIPE_SETUP.md`
- **Dealer Portal**: See `DEALER_PORTAL_README.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Design System**: See `src/app/globals.css`

---

**Built with premium design and full management capabilities** 🛡️

