const {authService,sendEmail,verifyUsers,loginService,refreshTokenService, getProfileService} = require("../service/auth.service")

const register = async (req, res) => {
    const {email,firstName,lastName,password,role_id} = req.body;

    const data ={
        email,
        firstName,
        lastName,
        password,
        role_id
    }

    const { createUser, token } = await authService(data);

     sendEmail(data, token);



    return res.status(201).json({
                success: true,
                message: "Register successfully",
                data: createUser
            });
};


const verifyUser = async (req, res) => {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        await verifyUsers(token);

        return res.status(200).json({
            success: true,
            message: "User verified successfully"
        });
};

const login = async(req,res) =>{

    const {email,password} = req.body;

    const data ={
        email,
        password
    }

    const result = await loginService(data);

    return res.status(200).json({
            success: true,
            message: "Login successfull",
            data:result
        });
}

const refreshToken = async(req,res) =>{
    const {token} = req.body;

    if(!token){
        return res.status(400).json({error:"Token is required"})
    }

    const result = await refreshTokenService(token)

    return res.status(201).json({message:"Refresh token",result})
    
}

const getProfile = async(req,res) =>{

    const authUserId = req.user.id;
   
    const result = await getProfileService(authUserId)

    return res.status(201).json({message:"get Profile",data:result})
}

module.exports = {register,verifyUser,login,refreshToken,getProfile}