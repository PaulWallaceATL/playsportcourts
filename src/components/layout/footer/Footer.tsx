export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <p className="heading-3">PlaySport Atlanta</p>
          <p className="text-sm text-muted-foreground mt-2">Premium courts, pro service.</p>
        </div>
        <div>
          <p className="font-semibold mb-2">Explore</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li><a href="/court-tiles" className="hover:underline">Court Tiles</a></li>
            <li><a href="/garage-tiles" className="hover:underline">Garage Tiles</a></li>
            <li><a href="/gallery" className="hover:underline">Gallery</a></li>
            <li><a href="/resurfacing" className="hover:underline">Resurfacing</a></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Contact</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>Milton, GA</li>
            <li>(770) 884-2337</li>
            <li>info@playsportatlanta.com</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Follow</p>
          <div className="flex gap-3 text-sm text-muted-foreground">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Facebook</a>
          </div>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-muted-foreground border-t border-border/60">© {new Date().getFullYear()} PlaySport Atlanta. All rights reserved.</div>
    </footer>
  );
}


