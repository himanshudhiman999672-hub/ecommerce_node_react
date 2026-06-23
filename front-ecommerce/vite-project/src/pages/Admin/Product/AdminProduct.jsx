import axios from "axios";
import { useEffect, useState } from "react";
import useCategories from "../../../hooks/useCategories";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
const AdminProduct = () => {
  const categories = useCategories() || [];

  const [product, setProduct] = useState([]);
  const [showForm, setForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: null,
    price: "",
    discount_price: "",
    stock: "",
    featured: false,
    category_id: "",
  });

  const token = localStorage.getItem("token");

  const getProduct = async () => {
    try {
      const result = axiosInstance.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProduct(result.data?.data?.product || []);
    } catch (error) {
      console.log("GET PRODUCT ERROR:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      images: null,
      price: "",
      discount_price: "",
      stock: "",
      featured: false,
      category_id: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file"
          ? files[0]
          : type === "checkbox"
          ? checked
          : value,
    }));
  };

  const submitProduct = async (e) => {
    e.preventDefault();

    try {
      if (!formData.category_id) {
        toast.error("Please select category");
        return;
      }

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("discount_price", formData.discount_price);
      data.append("stock", formData.stock);
      data.append("featured", formData.featured);
      data.append("category_id", formData.category_id);

      if (formData.images) {
        data.append("images", formData.images);
      }

      for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
      }

      if (isEdit) {
        const result = await axiosInstance.put(
          `${import.meta.env.VITE_API_URL}/api/v1/product/${editId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(result.data.message || "Product updated successfully");
        await getProduct();
        setForm(false);
        resetForm();
        setIsEdit(false);
        setEditId(null);
        return;
      }

      const result = await axiosInstance.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(result.data.message || "Product created successfully");
      await getProduct();
      setForm(false);
      resetForm();
      setIsEdit(false);
      setEditId(null);
    } catch (error) {
      console.log("PRODUCT ERROR:", error);
      console.log("BACKEND ERROR:", error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (prod) => {
    console.log("HANDLE EDIT PROD:", prod);

    setIsEdit(true);
    setEditId(prod.slug);
    setForm(true);

    setFormData({
      name: prod.name || "",
      description: prod.description || "",
      images: null,
      price: prod.price || "",
      discount_price: prod.discount_price || "",
      stock: prod.stock || "",
      featured: prod.featured === true || prod.featured === 1,
      category_id: String(prod.category_id || ""),
    });
  };

const deleteProduct = async () => {
  try {
    if (!editId) {
      toast.error("Please select product first");
      return;
    }

    const result = await axiosInstance.delete(
      `${import.meta.env.VITE_API_URL}/api/v1/product/${editId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(result.data.message || "Product deleted successfully");

    await getProduct();
    setForm(false);
    resetForm();
    setIsEdit(false);
    setEditId(null);
  } catch (error) {
    console.log("DELETE PRODUCT ERROR:", error);
    console.log("BACKEND ERROR:", error.response?.data);
    toast.error(error.response?.data?.message || "Something went wrong");
  }
};
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <button
        type="button"
        className="mt-5 ml-5 rounded-md bg-slate-950 px-4 py-3 text-sm font-black text-white"
        onClick={() => {
          setIsEdit(false);
          setEditId(null);
          setForm(true);
          resetForm();
        }}
      >
        Add Product
      </button>

      {showForm && (
        <div className="mx-5 mb-5 rounded-md bg-white p-5 shadow">
          <form onSubmit={submitProduct}>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              onChange={handleChange}
              className="border p-2 rounded w-full"
              value={formData.name}
            />

            <textarea
              name="description"
              placeholder="Enter product description"
              onChange={handleChange}
              className="border p-2 rounded w-full"
              value={formData.description}
            />

            <input type="file" name="images" onChange={handleChange} />
          <img  src={`${import.meta.env.VITE_API_URL}/uploads/${formData.image}`}
                               />
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
            />

            <input
              type="number"
              name="discount_price"
              placeholder="Enter Discount Price"
              value={formData.discount_price}
              onChange={handleChange}
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
            />

            <label>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              Featured Product
            </label>

            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </option>
              ))}
            </select>

            <div className="mt-3 flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {isEdit ? "Update Product" : "Save Product"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setForm(false);
                  resetForm();
                  setIsEdit(false);
                  setEditId(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
  type="button"
  onClick={deleteProduct}
  className="bg-red-500 text-white px-4 py-2 rounded"
>
  Delete
</button>
            </div>
          </form>
        </div>
      )}

      <section className="px-5 pb-8 lg:px-8">
        <div className="rounded-md border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 p-5">
            <h2 className="text-lg font-black">Product list</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">SKU</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Stock</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {product.map((prod) => (
                  <tr
                    key={prod.id}
                    onClick={() => handleEdit(prod)}
                    className="cursor-pointer"
                  >
                    <td className="px-5 py-4 font-black">{prod.name}</td>
                    <td>{prod.sku}</td>
                    <td>{prod.category_id}</td>
                    <td>{prod.stock}</td>
                    <td>{prod.price}</td>
                    <td>
                      <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700">
                        {prod.status === true || prod.status === 1
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminProduct;