import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();

    const[formData,setFormData] = useState({
      email:"",
      password:""
    })

    const[errorMessage,setErrorMessage ] = useState("")

    const handleChange = async(e)=>{
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit =async (e)=>{
          e.preventDefault()

      try{
         setErrorMessage("");
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/login`,formData)   
        const result = response.data.data
        
        localStorage.setItem("token",result.token)
        localStorage.setItem("user",JSON.stringify(result.user))
        console.log("resssulttt",result.user.role)
        if(result.user.role == "admin"){
          navigate("/admin/dashboard")
        }else if(result.user.role == "buyer"){
          navigate("/buyer/dashboard")

        }else{
          navigate("/seller/dashboard")
        }

       toast.success(response.data.message);
      }catch(error){

         toast.error(
    error.response?.data?.message || "Something went wrong"
  );
  
        setErrorMessage(
      error.response?.data?.message || "Something went wrong"
   );

        console.log(error.response.data.message);
      }
    }
  return (
    <>
      <main>
        <section className="band">
          <div className="mx-auto max-w-7xl px-5">
            <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
              Login
            </p>

            <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                Welcome back
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md px-5 panel">
            <input placeholder="Email" name="email" placeholder="Email" onChange={handleChange} />

            <input
              placeholder="Password"
              type="password" 
              name="password"
              placeholder="password"
              onChange={handleChange}
            />

          {errorMessage && (
  <p className="mt-3 text-sm font-semibold text-red-600">
    {errorMessage}
  </p>
)}

            <button  type="submit" className="btn-dark mt-3" >
              Login
            </button>

            <a
              className="mt-4 block text-center font-semibold text-zinc-700"
              href="register.html"
            >
              Create account
            </a>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
