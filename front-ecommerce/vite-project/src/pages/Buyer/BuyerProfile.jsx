import BuyerShell from "./BuyerShell";
import axios from "axios"
import { useEffect } from "react";
import { useState } from "react";

const BuyerProfile = () => {
const [address,setAddress] = useState([])
const token = localStorage.getItem("token")

  const getAdress = async() =>{
    try{
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/profile`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })

        console.log("res",result.data.data)

        setAddress(result.data.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getAdress()
  },[])
  return (
    <BuyerShell
      eyebrow="Profile"
      title="Personal details"
      description="Static profile form for name, email, phone, and password changes."
    >
      <section className="panel">
        <h2>Account information</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input placeholder="First name" value={address.firstName} defaultValue="Himanshu" />
          <input placeholder="Last name" value={address.lastName} defaultValue="Dhiman" />
          <input placeholder="Email" value={address.email} defaultValue="buyer@example.com" />
          {/* <input placeholder="Phone" defaultValue="9999999999" /> */}
        </div>
        {/* <button className="btn-dark mt-5" type="button">Update profile</button> */}
      </section>
{/* 
      <section className="panel mt-6">
        <h2>Change password</h2>
        <div className="grid gap-3 md:grid-cols-3">
          <input placeholder="Current password" type="password" />
          <input placeholder="New password" type="password" />
          <input placeholder="Confirm password" type="password" />
        </div>
        <button className="btn-light mt-5" type="button">Change password</button>
      </section> */}
    </BuyerShell>
  );
};

export default BuyerProfile;
