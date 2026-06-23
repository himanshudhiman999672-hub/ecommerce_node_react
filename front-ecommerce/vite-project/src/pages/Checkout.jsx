import axios from "axios";
import { useState } from "react";

const Checkout = () => {
  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    payment_method: "COD",
    address_type:""
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();
  console.log("FORM DATA:", formData);
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/address`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(result.data);
    } catch (error) {
      console.log(error);
       console.log("STATUS:", error.response?.status);
  console.log("BACKEND MESSAGE:", error.response?.data);
    }
  };

  return (
    <main>
      <section className="band">
        <form
          onSubmit={submitData}
          className="mx-auto mt-8 grid max-w-7xl gap-6 px-5 lg:grid-cols-3"
        >
          <div className="grid gap-6 lg:col-span-2">
            <div className="panel">
              <h2>Contact</h2>
              <input
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="panel">
              <h2>Shipping address</h2>

              <div className="grid gap-3">
                <input
                  name="name"
                  placeholder="First name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  name="address_line"
                  placeholder="Address"
                  value={formData.address_line}
                  onChange={handleChange}
                  className="md:col-span-2"
                />

                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                />

                <input
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                />

                <input
                  name="pincode"
                  placeholder="Postal code"
                  value={formData.pincode}
                  onChange={handleChange}
                />

                 <input
                  name="address_type"
                  placeholder="Address Type"
                  value={formData.address_type}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="panel">
              <h2>Payment</h2>

              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
              >
                <option value="COD">Cash on Delivery</option>
                <option value="ONLINE">Online Payment</option>
              </select>
            </div>
          </div>

          <aside className="panel">
            <h2>Total due</h2>

            <p className="total">
              <span>Total</span>
              <strong>$318</strong>
            </p>

            <button type="submit" className="btn-dark mt-5 w-full">
              Place order
            </button>
          </aside>
        </form>
      </section>
    </main>
  );
};

export default Checkout;