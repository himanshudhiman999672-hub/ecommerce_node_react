import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
const EditCategory = () =>{

const navigate = useNavigate();
  const {slug} = useParams()
// const [categories,setCategories] = useState({})
  const [formData,setFormData] = useState({
    name:"",
    description:"",
    image:"",
    status:"0"
  })
  
const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      const data = new FormData()

      data.append("name",formData.name);
      data.append("description",formData.description)
      data.append("image", formData.image);
      data.append("status", formData.status);

    const token = localStorage.getItem("token")


      const result = await axios.put(
  `${import.meta.env.VITE_API_URL}/api/v1/category/${slug}`,data,{
    headers:{
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    }
  }
)

navigate(`/admin/edit/category/${result.data.data.slug}`);
   toast.success(result.data.message);

    setFormData({
  name: result.data.data.name,
  description: result.data.data.description,
  image: "",
  status: result.data.data.status,
});

    }catch(error){
      console.log(error)
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }


  const getCategory = async () => {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/category/${slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const item = result.data.data;
if (!item) {
  return;
}
    setFormData({
      name: item.name,
      description: item.description,
      image: item.image,
       status: item.status ? "1" : "0",
    });

  } catch (error) {
    console.log(error);
  }
};




  useEffect(() =>{
      getCategory()
    },[])
  

return(
    <>
       <div className="min-h-screen bg-slate-100 p-4 text-slate-800 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">
            Category Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create and manage product categories
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form Section */}
          <div className="rounded-2xl bg-white p-6 shadow-sm w-full">
            <h2 className="text-lg font-bold">Add Category</h2>

            <p className="mt-1 text-sm text-slate-500">
              Fill category details below
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter category name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  name="description"
                  rows="4"
                  placeholder="Enter category description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category Image
                </label>

                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />

                      <img
  src={`${import.meta.env.VITE_API_URL}/uploads/${formData.image}`}
  alt={formData.name}
  className="h-12 w-12 rounded object-cover"
/>
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Save Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
)
}

export default EditCategory