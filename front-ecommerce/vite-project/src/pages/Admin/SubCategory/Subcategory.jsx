import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

const AdminSubCategory = () => {
    const [subcategory, setsubCategory] = useState([])
    const [showForm, setShowForm] = useState(false);
    const [subCategory, setAddCategory] = useState({
        name: "",
        description: "",
        image: "",
        status: 1,
        category_id: ""
    })
    const [categories, setCategories] = useState([]);

    const [editId, setEditId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const token = localStorage.getItem("token");

    const getCategory = async () => {
        const result = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/v1/category`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        setCategories(result.data.data)
    }

    const getSubCategory = async () => {
        const result = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/api/v1/subcategory`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        console.log("result", result.data.data)
        setsubCategory(result.data.data)
    }


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setAddCategory({
            ...subCategory,
            [name]: name === "image" ? files[0] : value,
        });
    }

    const submitsubCategory = async (e) => {

        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append("name", subCategory.name)
            formData.append("description", subCategory.description)
            formData.append("image", subCategory.image)
            formData.append("status", subCategory.status)
            formData.append("category_id", subCategory.category_id)
            if (isEdit) {
                await axiosInstance.put(`${import.meta.env.VITE_API_URL}/api/v1/subcategory/${editId}`,

                    formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
                )

                toast.success("Category updated successfully");
            } else {



                const result = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/v1/subcategory`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data"
                        }
                    }

                )


                setAddCategory({
                    name: "",
                    description: "",
                    image: "",
                    status: 1,
                    category_id: ""

                })

                setShowForm(false);
                await getSubCategory();
                toast.success(result.data.message);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
    const handleEdit = (data) => {
        //   const selectedCategoryId = String(data.Category_id);
        // console.log("select",selectedCategoryId)
        setShowForm(true)
        setIsEdit(true)

        setEditId(data.slug)
       

        setAddCategory({
            name: data.name,
            description: data.description,
            image: data.image,
            status: data.status,
              category_id: String(data.Category_id || "")

        })
    }

    const deleteEdit = async () => {
  try {
    const result = await axiosInstance.delete(
      `${import.meta.env.VITE_API_URL}/api/v1/subcategory/${editId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(result.data.message);
    setShowForm(false);
    getSubCategory();

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};
    useEffect(() => {
        getSubCategory(),
            getCategory()
    }, [])




    return (
        <>
            <button
                onClick={() => setShowForm(true)}
                className="mt-5 ml-5 flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-emerald-700"
            >
                <span>+</span>
                Add SubCategory
            </button>

            {showForm && (

                <div className="mx-5 mb-5 rounded-md bg-white p-5 shadow">
                    <form onSubmit={submitsubCategory}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter category name"
                            value={subCategory.name}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />


                        <textarea
                            type="text"
                            name="description"
                            placeholder="Enter category description"
                            value={subCategory.description}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                        />
                        <input type="file" name="image" onChange={handleChange} />
                        {isEdit && subCategory.image && (
                            <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${subCategory.image}`}
                                alt="Preview"
                                className="mt-3 h-24 w-24 rounded object-cover"
                            />
                        )}

                            <select
  name="category_id"
  value={String(subCategory.category_id)}
  onChange={handleChange}
>
  <option value="">Select Category</option>

  {categories.map((cat) => (
    <option key={cat.id} value={String(cat.id)}>
      {cat.name}
    </option>
  ))}
</select>

                        <select
                            name="status"
                            value={subCategory.status}
                            onChange={handleChange}
                            className="mt-3 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        >
                            <option value="1">Active</option>
                            <option value="2">Inactive</option>
                        </select>


                        <div className="mt-3 flex gap-2">
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                {isEdit ? "Update Category" : "Save Category"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>

                             <button
                type="button"
                 onClick={deleteEdit}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
                        </div>
                    </form>
                </div>

            )}


            <section className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3 lg:p-8">
                {subcategory.map((data) => (
                    <article
                        key={data._id || data.id}
                        onClick={() => handleEdit(data)}
                        className="cursor-pointer rounded-md bg-white p-5"
                    >
                        <div className="flex justify-between">
                            <h2 className="font-black">{data.name}</h2><span
                                className="rounded bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">428</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">Mobiles, Audio, Accessories</p>
                    </article>
                ))}


            </section>
        </>
    )
}

export default AdminSubCategory