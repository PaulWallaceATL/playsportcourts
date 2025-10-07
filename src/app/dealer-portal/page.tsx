import Link from "next/link";

export default function DealerPortalPage() {
  return (
    <section className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pad-section">
      <h1 className="heading-1 text-white">Swisstrax Dealer Portal</h1>
      <p className="mt-2 text-body text-muted-foreground">Resources, applications, and an order request form for certified dealers.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <article className="surface-elevated rounded-xl p-5">
          <h2 className="heading-2 mb-2">Introduction</h2>
          <p className="text-body">As a Certified Swisstrax Dealer, [Dealer Name] provides a variety of modular tile flooring options from Swisstrax. Known for premium garage flooring solutions, Swisstrax flooring can be used for both residential and commercial applications. <Link href="/garage-tiles" className="holo-link">Learn more about the tile options</Link>.</p>
          <div className="mt-4 grid gap-3">
            <div>
              <h3 className="heading-3">Residential Applications Include</h3>
              <ul className="list-disc pl-5 text-body">
                <li>Garage</li><li>Home Gym</li><li>Patio & Deck</li><li>Craft Areas</li><li>Unfinished Basement</li><li>Sheds</li><li>Home Office</li>
              </ul>
            </div>
            <div>
              <h3 className="heading-3">Commercial Applications Include</h3>
              <ul className="list-disc pl-5 text-body">
                <li>Retail stores</li><li>Offices</li><li>Showrooms</li><li>Car Dealership Showrooms</li><li>Outdoor Events</li><li>Dance Floors</li><li>Commercial Garages</li><li>Airplane Hangars</li><li>Corporate Events</li><li>Gym Flooring</li>
              </ul>
            </div>
            <div>
              <h3 className="heading-3">Benefits</h3>
              <ul className="list-disc pl-5 text-body">
                <li>Customize your floors with specific tiles & designs</li>
                <li>Protect floors from impact and chemicals</li>
                <li>Cover stained or cracked flooring</li>
                <li>Industry leading warranty</li>
                <li>No prep required; finish in hours, not days</li>
              </ul>
            </div>
          </div>
        </article>

        <article className="surface-elevated rounded-xl p-5">
          <h2 className="heading-2 mb-2">Order Request</h2>
          <form className="grid gap-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="control glass-dark p-2" placeholder="Dealer Name" />
              <input className="control glass-dark p-2" placeholder="Project Name" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input className="control glass-dark p-2" placeholder="Ship To Address" />
              <input className="control glass-dark p-2" placeholder="City" />
              <input className="control glass-dark p-2" placeholder="State" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input className="control glass-dark p-2" placeholder="Zip Code" />
              <input className="control glass-dark p-2" placeholder="Contact Name" />
              <input className="control glass-dark p-2" placeholder="Phone" />
            </div>
            <textarea className="control glass-dark p-2" placeholder="Notes"></textarea>
            <button className="btn-neon glass-dark rounded-md px-4 py-2 text-sm" type="submit">Submit Request</button>
          </form>
        </article>
      </div>
    </section>
  );
}


