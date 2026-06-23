import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const Category = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    status: "1",
  });
const [categories,setCategories ] = useState([])
  
const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("image", formData.image);
      data.append("status", formData.status);

    const token = localStorage.getItem("token")

      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/category`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(result.data.message);

      setFormData({
        name: "",
        description: "",
        image: null,
        status: "1",
      });
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };


  const getCategory = async() =>{
    try{
    const token = localStorage.getItem("token")

      const result = await axios.get( `${import.meta.env.VITE_API_URL}/api/v1/category`,
        {
          headers: {
             Authorization: `Bearer ${token}`,
          }
        },
      )

      setCategories(result.data.data)

      console.log("result",result)
    }catch(error){
      console.log(error)
    }
  }


  useEffect(() =>{
    getCategory()
  },[])

 const handleDelete = async (slug) => {
  try {
    const token = localStorage.getItem("token");

    const result = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/v1/category/${slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(result.data.message);

    getCategory();

  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};

  return (
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
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-1">
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

          {/* Table Section */}
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-bold">Categories</h2>

                <p className="mt-1 text-sm text-slate-500">
                  List of all product categories
                </p>
              </div>

              <div className="rounded-xl bg-slate-100 px-4 py-2">
                <input
                  type="text"
                  placeholder="Search category..."
                  className="bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[750px] text-left text-sm">
                <thead>
                  <tr className="border-b text-slate-500">
                    <th className="py-4">Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                

                <tbody>
  {categories.length > 0 ? (
    categories.map((item) => (
      <tr key={item.id} className="border-b">
        <td className="py-4">
          <img
  src={`${import.meta.env.VITE_API_URL}/uploads/${item.image}`}
  alt={item.name}
  className="h-12 w-12 rounded object-cover"
/>
        </td>

        <td>{item.name}</td>

        <td>{item.description}</td>

        <td>
          {item.status == 1 ? "Active" : "Inactive"}
        </td>

        <td className="text-right">
            <Link to={`/admin/edit/category/${item.slug}`}>EDIT</Link>

            <button onClick={() => handleDelete(item.slug)}>
  Delete
</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="5"
        className="py-12 text-center text-slate-500"
      >
        No categories found
      </td>
    </tr>
  )}
</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;