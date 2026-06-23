import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import {useCart} from "../context/cartContext"

const API_URL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:1000"
const fallbackImage = "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"
const uploadUrl = (filename) => filename ? `${API_URL}/uploads/${encodeURIComponent(filename.trim())}` : fallbackImage

const handleImageError = (event) => {
  event.currentTarget.onerror = null
  event.currentTarget.src = fallbackImage
}

const ProductDetails = () =>{
  const [product,setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)
 const {slug} = useParams()
 const productImages = product?.product_images || []
 const mainImage = productImages[0]?.image
 const maxQuantity = Number(product.stock) > 0 ? Number(product.stock) : 99
 const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))
 const increaseQuantity = () => setQuantity((prev) => Math.min(maxQuantity, prev + 1))
 const token = localStorage.getItem("token");

 const { addToCart } = useCart();
  
    const getProduct = async() =>{
     

      const result = await axios.get(`${API_URL}/api/v1/products/${slug}`)

      console.log(result.data.data)

      setProduct(result.data.data)

      
    }

  

    useEffect(() =>{
      getProduct()
    },[])

    return(
        <>
            <main>
    <section class="band">
      <div class="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2">
        <div class="grid gap-4">
          <img
            src={uploadUrl(mainImage)}
            onError={handleImageError}
            alt={product.name || "Product"}
            className="h-[560px] w-full rounded-lg border border-zinc-200 bg-white object-cover shadow-sm"
          />
          <div class="grid grid-cols-3 gap-4">
            {productImages.slice(1, 4).map((img) => (
              <img
                key={img.id}
                src={uploadUrl(img.image)}
                onError={handleImageError}
                alt={product.name || "Product"}
                className="h-32 w-full rounded-md border border-zinc-200 object-cover"
              />
            ))}
          </div>
        </div>
        <div>
          <p class="text-sm font-black uppercase tracking-normal text-emerald-700">Fashion</p>
          <h1 class="mt-2 text-5xl font-black leading-tight">{product.name}</h1>
          <p class="mt-4 text-2xl font-black">${product.price}</p>
          <p class="mt-5 text-lg leading-8 text-zinc-600">{product.description}</p>
          <div class="mt-6 grid gap-3 sm:grid-cols-3">
            {/* <span class="option">S</span><span class="option option-active">M</span><span class="option">L</span> */}
          </div>
          <div className="mt-8">
            <p className="text-sm font-black uppercase text-zinc-500">Quantity</p>
            <div className="mt-3 inline-flex h-12 items-center overflow-hidden rounded-md border border-zinc-300 bg-white">
              <button
                type="button"
                onClick={decreaseQuantity}
                className="h-full w-12 border-r border-zinc-300 text-xl font-black text-zinc-900 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:text-zinc-300"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="flex h-full w-14 items-center justify-center text-base font-black text-zinc-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={increaseQuantity}
                className="h-full w-12 border-l border-zinc-300 text-xl font-black text-zinc-900 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:text-zinc-300"
                disabled={quantity >= maxQuantity}
              >
                +
              </button>
            </div>
          </div>
          <div class="mt-8 flex flex-wrap gap-3">
         <button
  type="button"
  onClick={() => addToCart(product.slug, quantity)}
  className="btn-dark"
  disabled={!product.slug}
>
  Add to cart
</button>
            <a class="btn-light" href="checkout.html">Buy now</a>
            <a class="btn-light" href="wishlist.html">Save</a>
          </div>
          <div class="mt-8 grid gap-4 border-t border-zinc-200 pt-8">
            <p><strong>Delivery:</strong> 2-5 business days</p>
            <p><strong>Returns:</strong> 30 day return window</p>
            <p><strong>Care:</strong> Machine wash cold, lay flat to dry</p>
          </div>
        </div>
      </div>
    </section>
  </main>
        </>
    )
}


export default ProductDetails
