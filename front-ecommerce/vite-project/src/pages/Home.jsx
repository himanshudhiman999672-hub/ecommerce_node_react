import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import {useCart} from "../context/cartContext"
const API_URL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:1000"
const placeholderImage = (label) =>
  `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600">
      <rect width="900" height="600" fill="#f4f4f5"/>
      <rect x="260" y="170" width="380" height="260" rx="14" fill="#e4e4e7"/>
      <circle cx="360" cy="255" r="48" fill="#a7f3d0"/>
      <path d="M285 405l135-125 85 82 55-49 88 92H285z" fill="#71717a"/>
      <text x="450" y="500" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#3f3f46">${label}</text>
    </svg>
  `)}`
const categoryFallback = placeholderImage("Category image")
const productFallback = placeholderImage("Product image")

const uploadUrl = (filename) => filename ? `${API_URL}/uploads/${filename}` : null

const handleImageError = (event, fallbackUrl) => {
  event.currentTarget.onerror = null
  event.currentTarget.src = fallbackUrl
}

const Home = () =>{
  const [category,setCategory] = useState([])
  const [product,setProduct] = useState([])
  const getCategory = async() =>{
    const result = await axios.get(`${API_URL}/api/v1/categories`)
    setCategory(result.data.data)
  }
 const { addToCart } = useCart();

  const getProduct = async() =>{
    const result = await axios.get(`${API_URL}/api/v1/feature-products`)

    setProduct(result.data.data)
  }

  useEffect(() =>{
getCategory(),
getProduct()
  },[])
return(
    <>
       <main>
    <section className="hero">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-emerald-700">Spring edit now live</p>
          <h1 className="mt-3 text-5xl font-black leading-none md:text-7xl">Shop smarter across every category.</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-700">A polished ecommerce storefront with category
            journeys, product pages, carts, checkout, customer account pages, order tracking, and support pages.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="btn-dark" href="products.html">Shop products</a>
            <a className="btn-light" href="categories.html">Browse categories</a>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
            alt="MarketLane storefront" className="h-full min-h-96 w-full object-cover" />
        </div>
      </div>
    </section>
    <section className="band">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-sm font-black uppercase tracking-normal text-emerald-700">Categories</p>
        <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Start with a department</h1>
          <p className="max-w-xl text-base leading-7 text-zinc-600">Each shopping path has its own page so the frontend
            feels like a real ecommerce site.</p>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-5">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
       {category.map((data) => (


          <Link className="category-card" to={`/product/${data.slug}`} key={data.id || data.slug}>
  <img
    src={uploadUrl(data.image) || categoryFallback}
    onError={(event) => handleImageError(event, categoryFallback)}
    alt={data.name || "Category"}
    className="h-48 w-full object-cover"
  />
 
        

            
           <span className="block p-4">
              <span className="block text-xl font-black">{data.name}</span>
              {data.subcategories?.map((d) =>(
              <span className="mt-1 block text-sm text-zinc-600" key={d.id}>
                {d.name}
              </span>
              ))}
            </span>
          </Link>
          ))}
         </div>
      </div>
    </section>
    <section className="band bg-white">
      <div className="mx-auto max-w-7xl px-5">
        <p className="text-sm font-black uppercase tracking-normal text-emerald-700">Featured</p>
        <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Popular this week</h1>

        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-5">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
         {product.map((data)=>{
          const productImage = data.product_images?.[0]?.image

          return (
             <article className="product-card" key={data.id || data.slug}>
           
          <Link  to={`/product/${data.slug}`} key={data.id || data.slug}>

              
              <img
                src={uploadUrl(productImage) || productFallback}
                onError={(event) => handleImageError(event, productFallback)}
                alt={data.name || "Product"} className="product-img"/></Link>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
            <p className="text-xs font-black uppercase tracking-normal text-zinc-500">
  {data.Category?.name}
</p>
                  <h3 className="mt-1 text-lg font-black">
          <Link className="category-card" to={`/product/${data.slug}`} key={data.id || data.slug}>
{data.name}</Link></h3>
                </div>
                <p className="font-black">$68</p>
              </div>
              <div className="mt-4 flex gap-2">
                     <button
  type="button"
  onClick={() => addToCart(data.slug, 1)}
className="btn-dark flex-1"
  disabled={!data.slug}
>
  Add to cart
</button>
             {/* <a className="btn-dark flex-1" href="cart.html">Add to cart</a> */}
                <a className="btn-light" href="wishlist.html">♡</a>
              </div>
            </div>
          </article>
         )})}
       
          
        </div>
      </div>
    </section>
    <section className="band">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-3">
        <div className="stat"><strong>24h</strong><span>Dispatch on stocked items</span></div>
        <div className="stat"><strong>30d</strong><span>Easy returns and exchanges</span></div>
        <div className="stat"><strong>4.8</strong><span>Average customer rating</span></div>
      </div>
    </section>
  </main> 
    </>
)
}

export default Home
