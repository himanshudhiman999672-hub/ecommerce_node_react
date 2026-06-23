const getDataService = require("../service/dashboard.service");

const getData = async(req,res) =>{
    const authUserId = req.user.id

    const result = await getDataService(authUserId);

    return res.status(201).json({message:"Retrived order successfully",data:result})

}

module.exports = getData