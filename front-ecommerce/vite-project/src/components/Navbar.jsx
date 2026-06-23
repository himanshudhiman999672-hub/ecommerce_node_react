import { Link } from "react-router-dom"
import { useCart } from "../context/cartContext"
const Navbar = () => {

    const { cartCount, cartItems } = useCart()
    return (
        <>

            <header className="sticky top-0 z-40 border-b border-zinc-200 bg-stone-50/95">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
                    <a href="index.html" className="flex items-center gap-3" aria-label="MarketLane home">
                        <span className="grid h-10 w-10 place-items-center rounded-md bg-zinc-950 text-lg font-black text-white">M</span>
                        <span>
                            <span className="block text-lg font-black leading-5 tracking-normal">MarketLane</span>
                            <span className="block text-xs font-semibold uppercase tracking-normal text-zinc-500">Everyday commerce</span>
                        </span>
                    </a>

                    <nav className="hidden items-center gap-6 md:flex">
                        
                        <Link to="/" className="border-b-2 text-zinc-950 border-zinc-950 pb-1 text-sm font-semibold" href="index.html">Home</Link>
                    <Link to="/categories" className="border-b-2 text-zinc-500 border-transparent hover:text-zinc-950 pb-1 text-sm font-semibold" href="categories.html">Categories</Link>
                    <Link to="/subcategory" className="border-b-2 text-zinc-500 border-transparent hover:text-zinc-950 pb-1 text-sm font-semibold" href="subcategory.html">Subcategory</Link>
                    <Link className="border-b-2 text-zinc-500 border-transparent hover:text-zinc-950 pb-1 text-sm font-semibold" href="products.html">Shop</Link>
                    <a className="border-b-2 text-zinc-500 border-transparent hover:text-zinc-950 pb-1 text-sm font-semibold" href="orders.html">Orders</a>
                    <a className="border-b-2 text-zinc-500 border-transparent hover:text-zinc-950 pb-1 text-sm font-semibold" href="account.html">Account</a>
                    </nav>
                    <div className="flex items-center gap-2">
                        <a className="icon-btn" href="search.html" aria-label="Search">⌕</a>
                        <a className="icon-btn" href="wishlist.html" aria-label="Wishlist">♡</a>
                        <div className="group relative">
                            <button type="button" className="icon-btn relative" aria-label="Cart">
                                🛒
                                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-emerald-600 px-1 text-[11px] font-black leading-none text-white">
                                   {cartCount}
                                </span>
                            </button>
                            <div className="invisible absolute right-0 top-full z-50 mt-3 w-80 translate-y-2 rounded-md border border-zinc-200 bg-white p-4 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                                <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                                    <p className="text-sm font-black text-zinc-950">Cart items</p>
                                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">2 items</span>
                                </div>
                                <div className="mt-3 grid gap-3">
                                    {cartItems.map((item)=>(
  <div className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3">
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}/uploads/${item.Product.product_images.image}`}
                                            alt="Cart product"
                                            className="h-14 w-14 rounded-md object-cover"
                                        />
                                        <div>
                                            <p className="line-clamp-1 text-sm font-black text-zinc-950">{item.Product?.name}</p>
                                            <p className="mt-1 text-xs font-semibold text-zinc-500">Qty {item.quantity}</p>
                                        </div>
                                        <strong className="text-sm text-zinc-950">${item.total}</strong>
                                    </div>
                                        
                                    )
                                )  
                                    }
                                  
                                  
                                </div>
                                <div className="mt-4 border-t border-zinc-200 pt-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-zinc-500">Subtotal</span>
                                        <strong className="text-zinc-950">$197</strong>
                                    </div>
                                    <Link className="btn-dark mt-3 w-full" to="cart">View cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-5 pb-4 md:hidden"><a className="border-b-2 text-zinc-950 border-zinc-950 pb-1 text-sm font-semibold" href="index.html">Home</a><a className="border-b-2 text-zinc-500 border-transparent hover:text-zinc-950 pb-1 text-sm font-semibold" href="categories.html">Categories</a><a className="border-b-2 text-zinc-500 border-transparent hover:text-zinc-950 pb-1 text-sm font-semibold" href="subcategory.html">Subcategory</a><a className="border-b-2 text-zinc-500 border-transparent hover:text-zinc-950 pb-1 text-sm font-semibold" href="products.html">Shop</a><a className="border-b-2 text-zinc-500 border-transparent hover:text-zinc-950 pb-1 text-sm font-semibold" href="orders.html">Orders</a><a className="border-b-2 text-zinc-500 border-transparent hover:text-zinc-950 pb-1 text-sm font-semibold" href="account.html">Account</a></nav>
            </header>
        </>
    )
}

export default Navbar
