const Address = require("../models/Address")

const postAddressService  =async(data,authUserId) =>{
    const result = Address.create({
            user_id:authUserId,
            name:data.name,
            phone:data.phone,
            address_line:data.address_line,
            city:data.city,
            state:data.state,
            pincode:data.pincode,
            address_type:data.address_type
    })
    return result
}

const AddressById = async(id,authUserId) =>{
    console.log("authUserId",authUserId)
const result = await Address.findOne({
   where: {
      id: id,
      user_id: authUserId
   }
})
return result
}

const updateAddresByIdService = async(data,id,authUserId) =>{

    const checkAddress = await Address.findOne({where:{id:id,user_id:authUserId}})

   await Address.update(
        {
            name: data.name,
            phone: data.phone,
            address_line: data.address_line,
            city: data.city,
            state: data.state,
            pincode: data.pincode
        },
        {
            where: {
                id: id,
                user_id: authUserId
            }
        }
    )
     const result = await Address.findOne({where:{id:id,user_id:authUserId}})

      return result
}

const deleteAddressService = async(id,authUserId) =>{
     const result = await Address.destroy({
            where:{id:id,user_id:authUserId}
        })

        return result
}
module.exports = {postAddressService,AddressById,updateAddresByIdService,deleteAddressService}