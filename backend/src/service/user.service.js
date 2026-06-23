const User = require("../models/User")
const Order = require("../models/Order");
const Role = require("../models/Role");
const getAllUser = async(limit,page,offset) =>{
   
    const result = await User.findAndCountAll({
    limit,
    offset,
    include:[
        {
        model:Order

        },{
            model:Role,
            attributes:["name"]
        }
    ]
});


const data =   result.rows.map(user => ({
  ...user.toJSON(),
      totalOrders: user.orders ? user.orders.length : 0

}))

const totalAdmins = await User.count({
    include:[
        {
            model:Role,
            where:{
                name:"admin"
            }
        }
    ]
})


    
    return {
    count: result.count,
    rows: data,
    totalAdmins
  };
}


module.exports = getAllUser