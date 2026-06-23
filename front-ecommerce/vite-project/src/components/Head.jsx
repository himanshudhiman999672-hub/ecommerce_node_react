const Head = async() =>{
    return(
        <>
    <header class="topbar"><a class="brand" href="index.html"><span
                class="brand-mark">S</span><span><strong>ShopNest</strong><small>Explore Plus</small></span></a>
        <form class="search" action="search.html"><button type="submit" aria-label="Search"><svg viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path d="m21 20-5.8-5.8a7 7 0 1 0-1.4 1.4L20 21zM5 10a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" />
                </svg></button><input name="q" type="search" placeholder="Search for products, brands and more"></form>
        <nav class="top-actions" aria-label="Primary"><a href="login.html">Login</a><a href="seller.html">Become a
                Seller</a><a href="orders.html">Orders</a><a class="cart-link" href="cart.html"><span>Cart</span><b
                    id="cartCount">0</b></a></nav>
    </header>
        </>
    )
}

export default Head