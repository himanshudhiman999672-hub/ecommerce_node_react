const Address = require("../models/Address");
const {postAddressService,AddressById,updateAddresByIdService,deleteAddressService} = require("../service/adddress.service");
const { message } = require("../validation/addressvalidation");

const postAddress = async(req,res) =>{
    const {name,phone,address_line,city,state,pincode,address_type} = req.body
    const authUserId = req.user.id;

    const data ={
        name,
        phone,
        address_line,
        city,
        state,
        pincode,
        address_type
    }

    const result = await postAddressService(data,authUserId)

    res.status(201).json({message:"Address saved successfully",data:result})
}

const getAddress  = async(req,res) =>{
    const result = await Address.findAll({where:{user_id:req.user.id}});

    return res.status(201).json({message:"Address retrived successfully",data:result})
}

const getAddressById = async(req,res)=>{

    const {id} = req.params;
    const authUserId = req.user.id;
    const result = await AddressById(id,authUserId)

    return res.status(201).json({message:"Get data" , data:result})

}

const updateAddresById = async(req,res)=>{
    const {id} = req.params;
    const authUserId = req.user.id;
    const {name,phone,address_line,city,state,pincode,address_type} = req.body
   const data ={
        name,
        phone,
        address_line,
        city,
        state,
        pincode,
        address_type
    }
    const result = await updateAddresByIdService(data,id,authUserId)

    return res.status(201).json({message:"update address successfully",data:result})
}

const deleteAddress = async(req,res)=>{
    const {id} = req.params;
    const authUserId = req.user.id;
    const result = await deleteAddressService(id,authUserId)

    return res.status(201).json({message:"delete address successfully",data:result})
}


module.exports = {postAddress,getAddress,getAddressById,updateAddresById,deleteAddress}