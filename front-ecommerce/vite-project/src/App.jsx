import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register'
import Home from './pages/Home'
import Categories from './pages/Categories'
import About from './pages/About'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProductDetails  from './pages/ProductDetail';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './routes/AdminRoute';
import AdminUser from './pages/Admin/User/AdminUser';
import AdminCategory from './pages/Admin/Category/Category';
import AdminSubCategory from './pages/Admin/SubCategory/Subcategory';
import AdminProduct from './pages/Admin/Product/AdminProduct';
import BuyerDashboard from './pages/Buyer/BuyerDashboard';
import BuyerAddresses from './pages/Buyer/BuyerAddresses';
import BuyerNotifications from './pages/Buyer/BuyerNotifications';
import BuyerOrders from './pages/Buyer/BuyerOrders';
import BuyerPayments from './pages/Buyer/BuyerPayments';
import BuyerProfile from './pages/Buyer/BuyerProfile';
import BuyerShell from './pages/Buyer/BuyerShell';
import BuyerSupport from './pages/Buyer/BuyerSupport';
import BuyerTracking from './pages/Buyer/BuyerTracking';
import BuyerWishlist from './pages/Buyer/BuyerWishlist';
import BuyerOrderDetails from './pages/Buyer/BuyerOrderDetails';
import {io} from "socket.io-client"
import { useEffect } from 'react';
import './utils/axiosInstance';
import SellerDashboard from './pages/Seller/Dashboard';
import SellerSupport from './pages/Seller/SellerSupport';



function App() {
useEffect(()=>{
  const socket =io("http://localhost:1000")

  socket.on("notification:new",(data)=>{
    console.log("Notification received",data)
  })

  return () =>{
    socket.disconnect()
  }
},[])
  return (
    <>  
    <ToastContainer />
   <BrowserRouter>
 
 <Routes>
  <Route element={<UserLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    <Route path="/categories" element={<Categories />} />

    <Route path="/buyer/dashboard" element={<BuyerDashboard/>} />
    <Route path="/buyer/address" element={<BuyerAddresses/>} />
    <Route path="/buyer/notification" element={<BuyerNotifications/>} />
    <Route path="/buyer/orders/:slug" element={<BuyerOrderDetails/>} />

    <Route path="/buyer/orders" element={<BuyerOrders/>} />
    <Route path="/buyer/payments" element={<BuyerPayments/>} />
    <Route path="/buyer/profile" element={<BuyerProfile/>} />

   <Route path="/buyer/shell" element={<BuyerShell/>} />
      <Route path="/buyer/support" element={<BuyerSupport/>} />
         <Route path="/buyer/tracking" element={<BuyerTracking/>} />
      <Route path="/buyer/wishlist" element={<BuyerWishlist/>} />
      <Route path="/seller/dashboard" element={<SellerDashboard/>} />
      <Route path="/seller/support" element={<SellerSupport/>} />


    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Route>

  <Route element={<AdminRoute />}>
    <Route element={<AdminLayout />}>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/user" element={<AdminUser />} />
      <Route path="/admin/category" element={<AdminCategory />} />
      <Route path="/admin/subcategory" element={<AdminSubCategory />} />
      <Route path="/admin/product" element={<AdminProduct />} />

    </Route>
    
  </Route>
</Routes>
   </BrowserRouter>
    </>
  )
}

export default App
