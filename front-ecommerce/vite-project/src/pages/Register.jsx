
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const[errorMessage,setErrorMessage ] = useState("")
const navigate = useNavigate();
const [formData,setFormData ] = useState({
  email :"",
  firstName:"",
  lastName :"",
  password:"",
  confirmPassword:"",
  role_id:2
})

const handleChange =async (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async(e) =>{
  e.preventDefault()
  try{
    const result = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/register`,
      formData
    );
    navigate("/login")
     toast.success(result.data.message || "Register successful");
    

  }catch(error){
    console.log(error)
    toast.error(error.response?.data?.message || "Register failed");

  }
}
  return (
    <>
      <section className="band">
        <div className="mx-auto max-w-7xl px-5">

          <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
            Create Account
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Join MarketLane
            </h1>
          </div>

        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md px-5 panel">

          <input
            placeholder="email"
            type="email"
            name="email"
            onChange={handleChange}
          />

       
          <input
          name="firstName"
            placeholder="First Name"
            type="text"
            placeholder="First Name"
            onChange={handleChange}


          />


          <input
            placeholder="Last Name"
            type="text"
            name="lastName"
            onChange={handleChange}


          />

          <input type="text" name="password" placeholder="Password"      
          
          onChange={handleChange}
  />


        <input type="text" name="confirmPassword" placeholder="Confirm Password"  
        onChange={handleChange}
 />
          
      <select name="role_id" className="form-control"      
          onChange={handleChange}
>

        <option value="2">buyer</option>
        <option value="3">seller</option>

      </select>

          <button
            type="submit"
            className="btn-dark mt-3"
          >
            Create account
          </button>

        </form>
      </section>
    </>
  );
};

export default Register;