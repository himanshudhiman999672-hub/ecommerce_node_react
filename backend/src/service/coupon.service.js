const Coupon = require("../models/coupon")

const postCouponService = async(data) =>{
   const couponExist = await Coupon.findOne({
   where: {
      coupon_code: data.coupon_code
   }
    })



    if(couponExist){
        const error = new Error("Coupon already exist")
        error.status = 404
        throw  error
    }

  console.log("data",data)
    const result = Coupon.create({
        coupon_code:data.coupon_code,
        description:data.description,
        discount_type:data.discount_type,
        discount_value:data.discount_value,
        minimum_order_amount:data.minimum_order_amount,
        maximum_discount_amount:data.maximum_discount_amount,
        start_date:data.start_date,
        usage_limit:data.usage_limit,
        expiry_date:data.expiry_date,
        status:data.status
    })


    return result


}


const getAllCoupon = async()=>{
    const result = await Coupon.findAll({where:{
        is_delete:0}
        ,order:[["createdAt","DESC"]]})

    return result
}



const couponByIdService = async(id) =>{
    const couponIdData = await Coupon.findOne({where:{id:id}})

    if(!couponIdData){
        const error = new Error("No with this id Coupon")
        error.status = 201
        throw error
    }

    return couponIdData
}

const updateCouponService = async(id,data) =>{
    
    const couponCode = await Coupon.findOne({where:{id}})

    if(!couponCode){
        const error = new Error("update id Coupon")
        error.status = 201
        throw error
    }

    const updateData ={
        coupon_code:data.coupon_code,
        description:data.description,
        discount_type:data.discount_type,
        discount_value:data.discount_value,
        minimum_order_amount:data.minimum_order_amount,
        maximum_discount_amount:data.maximum_discount_amount,
        start_date:data.start_date,
        usage_limit:data.usage_limit,
        used_count:data.used_count,
        expiry_date:data.expiry_date,
        status:data.status
    }


   const updateCoupon = await Coupon.update(
   updateData,
   {
      where: {
         id: id
      }
   }
)

return updateCoupon

}

const deleteService = async(id) =>{
    console.log("sdksjdkskdksdksjdkskdksksdkjsdkskkdsdsdjsjdj")
    const result = await Coupon.update({
        is_delete:1
    },{
        where:{
        id:id
    }})
    return result
}


module.exports = {postCouponService,getAllCoupon,couponByIdService,updateCouponService,deleteService}