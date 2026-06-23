const Categories = () => {
  return (
    <>
      <main>
        <section className="band">

          <div className="mx-auto max-w-7xl px-5">

            <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
              All categories
            </p>

            <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">

              <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                Choose where to shop
              </h1>

              <p className="max-w-xl text-base leading-7 text-zinc-600">
                Departments, subcategories, and featured collections are
                separated for a full ecommerce flow.
              </p>

            </div>
          </div>

          <div className="mx-auto mt-8 max-w-7xl px-5">

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

              <a className="category-card" href="subcategory.html">

                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
                  alt="Fashion"
                  className="h-48 w-full object-cover"
                />

                <span className="block p-4">
                  <span className="block text-xl font-black">
                    Fashion
                  </span>

                  <span className="mt-1 block text-sm text-zinc-600">
                    Fresh layers, sneakers, bags
                  </span>
                </span>

              </a>

              <a className="category-card" href="subcategory.html">

                <img
                  src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=80"
                  alt="Electronics"
                  className="h-48 w-full object-cover"
                />

                <span className="block p-4">
                  <span className="block text-xl font-black">
                    Electronics
                  </span>

                  <span className="mt-1 block text-sm text-zinc-600">
                    Audio, mobile, desk tech
                  </span>
                </span>

              </a>

              <a className="category-card" href="subcategory.html">

                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80"
                  alt="Home"
                  className="h-48 w-full object-cover"
                />

                <span className="block p-4">
                  <span className="block text-xl font-black">
                    Home
                  </span>

                  <span className="mt-1 block text-sm text-zinc-600">
                    Lighting, bedding, decor
                  </span>
                </span>

              </a>

              <a className="category-card" href="subcategory.html">

                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80"
                  alt="Beauty"
                  className="h-48 w-full object-cover"
                />

                <span className="block p-4">
                  <span className="block text-xl font-black">
                    Beauty
                  </span>

                  <span className="mt-1 block text-sm text-zinc-600">
                    Skin, body, fragrance
                  </span>
                </span>

              </a>

            </div>
          </div>

        </section>
      </main>
    </>
  );
};

export default Categories;