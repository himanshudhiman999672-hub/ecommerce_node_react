import { Link } from "react-router-dom";

const BuyerShell = ({ title, eyebrow, description, children }) => {
  return (
    <main className="min-h-screen bg-stone-50">
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[17rem_1fr]">
        <aside className="h-fit rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="border-b border-zinc-200 pb-5">
            <p className="text-xs font-black uppercase tracking-widest text-emerald-700">
              Buyer Panel
            </p>
            <h2 className="mt-2 text-2xl font-black text-zinc-950">
              My Account
            </h2>
          </div>

          <nav className="mt-5 grid gap-2 text-sm font-bold text-zinc-600">
            <Link to="/buyer/dashboard" className="rounded-lg bg-emerald-50 px-4 py-3 text-emerald-800" href="/buyer/dashboard">
              Dashboard
            </Link>
            <Link to="/buyer/orders" className="rounded-lg px-4 py-3 hover:bg-zinc-100" >
              My Orders
            </Link>
            <Link to="/buyer/tracking" className="rounded-lg px-4 py-3 hover:bg-zinc-100">
              Live Tracking
            </Link>
            <Link to="/buyer/payments" className="rounded-lg px-4 py-3 hover:bg-zinc-100">
              Payments
            </Link>
            <Link to="/buyer/address" className="rounded-lg px-4 py-3 hover:bg-zinc-100">
              Addresses
            </Link>
            <Link  to="/buyer/wishlist" className="rounded-lg px-4 py-3 hover:bg-zinc-100">
              Wishlist
            </Link>
            <Link to="/buyer/profile" className="rounded-lg px-4 py-3 hover:bg-zinc-100">
              Profile
            </Link>
            <Link to="/buyer/notification" className="rounded-lg px-4 py-3 hover:bg-zinc-100">
              Notifications
            </Link>
            <Link to="/buyer/support" className="rounded-lg px-4 py-3 hover:bg-zinc-100">
              Support
            </Link>
          </nav>
        </aside>

        <div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
              {eyebrow}
            </p>
            <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h1 className="text-4xl font-black leading-tight text-zinc-950 md:text-5xl">
                  {title}
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                  {description}
                </p>
              </div>
              <a className="btn-dark" href="/products">
                Continue Shopping
              </a>
            </div>
          </div>

          <div className="mt-6">{children}</div>
        </div>
      </section>
    </main>
  );
};

export default BuyerShell;
