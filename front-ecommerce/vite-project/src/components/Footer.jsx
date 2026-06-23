const Footer = () =>{
    return(
        <>
            
      <footer class="border-t border-zinc-200 bg-white">
    <div class="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-4">
      <div>
        <p class="text-xl font-black">MarketLane</p>
        <p class="mt-3 text-sm leading-6 text-zinc-600">A complete static ecommerce frontend with separate pages,
          product journeys, account flows, support, and policy pages.</p>
      </div>
      <div>
        <p class="footer-title">Shop</p>
        <a href="categories.html">Categories</a>
        <a href="products.html">All products</a>
        <a href="offers.html">Offers</a>
        <a href="new-arrivals.html">New arrivals</a>
      </div>
      <div>
        <p class="footer-title">Customer</p>
        <a href="orders.html">Orders</a>
        <a href="track-order.html">Track order</a>
        <a href="returns.html">Returns</a>
        <a href="faq.html">FAQ</a>
      </div>
      <div>
        <p class="footer-title">Company</p>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="shipping.html">Shipping</a>
        <a href="privacy.html">Privacy</a>
      </div>
    </div>
  </footer>
        </>
    )
}

export default Footer