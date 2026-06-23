import { Link } from "react-router-dom"
import { useCart } from "../context/cartContext"
const Cart = () =>{
  const {cartItems,totalPrice,grandTotalPrice} =useCart()
  console.log("result",grandTotalPrice)
return(
    <>
     <main>
    <section class="band">
      <div class="mx-auto max-w-7xl px-5">
        <p class="text-sm font-black uppercase tracking-normal text-emerald-700">Cart</p>
        <div class="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 class="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Review your bag</h1>

        </div>
      </div>
      <div class="mx-auto mt-8 grid max-w-7xl gap-6 px-5 lg:grid-cols-3">
        
        <div class="space-y-4 lg:col-span-2">
         {cartItems.map((item) =>(
          
<article class="line-item"><img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
              alt="Aurora Knit Overshirt"/>
            <div>
              <h3>{item.Product.name}</h3>
              {/* <p>{}</p> */}
              <p>QTY{item.quantity}</p>
            </div><strong>${item.price}</strong>
          </article>

      

         ))}
          
        </div>
        <aside class="panel">
          <h2>Order summary</h2>
          <p><span>Subtotal</span><strong>${totalPrice}</strong></p>
          <p><span>Shipping</span><strong>$50</strong></p>
          <p class="total"><span>Total</span><strong>${grandTotalPrice}</strong></p><Link class="btn-dark mt-5 w-full"
            to='/checkout'>Checkout</Link>
        </aside>
      </div>
    </section>
  </main>
    </>
)
}

export default Cart