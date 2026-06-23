const Permission = require("../models/Permission")

const seedPermission = async() =>{
    try{
        const permissions =[
            "create_product",
            "edit_product",
            "delete_product",
            "update_product"
        ]

        for(let permission of permissions){
            const create = await Permission.findOrCreate({
                where:{
                    name:permission
                }
            })
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = seedPermission