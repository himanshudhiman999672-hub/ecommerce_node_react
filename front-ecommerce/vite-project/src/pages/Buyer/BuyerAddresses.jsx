import { useEffect, useState } from "react";
import BuyerShell from "./BuyerShell";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL?.trim() || "http://localhost:1000";

const emptyAddress = {
  name: "",
  phone: "",
  address_line: "",
  city: "",
  state: "",
  pincode: "",
  address_type: "home",
};

const BuyerAddresses = () => {
  const [formData, setFormData] = useState(emptyAddress);
  const [address, setAddress] = useState([]);
  const [editId,setEditId] = useState(null)
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getAddress = async () => {
    try {
      const result = await axios.get(`${API_URL}/api/v1/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAddress(result.data.data || []);
    } catch (error) {
      console.log("ADDRESS ERROR:", error.response?.data || error.message);
    }
  };

  const postAddress = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/v1/address`, formData, config);
      setFormData(emptyAddress);
      getAddress();
    } catch (error) {
      console.log("ADDRESS SAVE ERROR:", error.response?.data || error.message);
    }
  };

  const deleteAddress = async(id)=>{
    try{
          const result = await axios.delete(`${API_URL}/api/v1/address/${id}`,{ headers: {
          Authorization: `Bearer ${token}`,
        }});

    getAddress()
    }catch(error){
      console.log(error)
    }

  }

const handleEdit = async() =>{
  try{

  }catch(error){
    console.log("error",error)
  }
}

  useEffect(() => {
    let ignore = false;

    const loadAddress = async () => {
      try {
        const result = await axios.get(`${API_URL}/api/v1/address`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!ignore) {
          setAddress(result.data.data || []);
        }
      } catch (error) {
        console.log("ADDRESS ERROR:", error.response?.data || error.message);
      }
    };

    if (token) loadAddress();

    return () => {
      ignore = true;
    };
  }, [token]);



  return (


    <BuyerShell
      eyebrow="Addresses"
      title="Saved addresses"
      description="Manage delivery locations and choose a default checkout address later."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {address.map((item) => (
          <section className="panel" key={item.id}>
            <h2>{item.address_type}</h2>
            <p>{item.name}</p>
            <p>{item.address_line}</p>
            <p>
              {item.city}, {item.state} - {item.pincode}
            </p>
            <p>Phone: {item.phone}</p>

            <div className="mt-5 flex gap-3">
              <button className="btn-dark" type="button">
                Edit
              </button>

              <button className="btn-light" type="button" onClick={() =>deleteAddress(item.id)}>
                Delete
              </button>
            </div>
          </section>
        ))}


        <section className="panel md:col-span-2">
          <h2>Add new address</h2>
          <form onSubmit={postAddress}>

            <div className="grid gap-3 md:grid-cols-2">

              <input
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                placeholder="Phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                className="md:col-span-2"
                placeholder="Address line"
                name="address_line"
                value={formData.address_line}
                onChange={handleChange}
                required
              />
              <input
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <input
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
              <input
                placeholder="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
              <select
                name="address_type"
                value={formData.address_type}
                onChange={handleChange}
                className="min-h-12 rounded-md border border-zinc-300 bg-white px-4"
              >
                <option value="home">home</option>
                <option value="office">office</option>
                <option value="billing">billing</option>
                <option value="shipping">shipping</option>
              </select>


            </div>
            <button className="btn-dark mt-5" type="submit">Save address</button>
          </form>
        
        </section>
      </div>
    </BuyerShell>
  );
};

export default BuyerAddresses;
