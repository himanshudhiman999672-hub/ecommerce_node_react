const Coupon = require("../models/coupon");
const {postCouponService,getAllCoupon,couponByIdService,updateCouponService,deleteService} = require("../service/coupon.service")

const postCouponCode = async(req,res) =>{
    const {coupon_code,description,status,discount_type,discount_value,minimum_order_amount,start_date,maximum_discount_amount,usage_limit,expiry_date} = req.body;

        const data ={
            coupon_code,
            description,
            discount_type,
            discount_value,
            minimum_order_amount,
            maximum_discount_amount,
            start_date,
            usage_limit,
            status,
            expiry_date
        }

        const result = await postCouponService(data)

        return res.status(201).json({message:"Coupon posted sucessfully",data:result})
}

const getByCoupon =async(req,res) =>{
    const result = await getAllCoupon();

    return res.status(201).json({message:"All Coupon retrived successfully",data:result})
}

const getCouponById = async(req,res) =>{
    const {id} = req.params;

    const result = await couponByIdService(id)

    return res.status(201).json({message:"Coupon By Id",data:result})

}

const updateById = async(req,res) =>{
   const {coupon_code,description,status,discount_type,discount_value,minimum_order_amount,start_date,maximum_discount_amount,usage_limit,expiry_date} = req.body;

        const data ={
            coupon_code,
            description,
            discount_type,
            discount_value,
            minimum_order_amount,
            maximum_discount_amount,
            start_date,
            usage_limit,
            status,
            expiry_date
        }
        const {id} = req.params
    const result =await updateCouponService(id,data)

    return res.status(200).json({message:"update coupon successfully",data:result})
}
const deleteById = async(req,res) =>{
        console.log("ssdsdlsdskldskdlskldsdksdksl,s,mxcm")

    const {id} = req.params
    const result = await deleteService(id)
    return res.status(200).json({message:"delete mesage",data:result})
}
module.exports = {postCouponCode,getByCoupon,getCouponById,updateById,deleteById}