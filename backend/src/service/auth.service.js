
const User = require("../models/User")
const Role = require("../models/Role")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");


const authService = async(data,next) =>{
      const checkEmail = await User.findOne({where:{email:data.email}})

    if(checkEmail){
       const error = new Error("User already exists");
        error.statusCode = 400;
        throw error;
    }
    const hashPassword = await bcrypt.hash(data.password,10);
    const token = crypto.randomBytes(32).toString("hex");
    
    if(data.role_id == 1){
         const error = new Error("Not allowed to create");
        error.statusCode = 400;
        throw error;
    }
    const createUser = await User.create({
        email:data.email,
        firstName:data.firstName,
        lastName:data.lastName,
        password:hashPassword,
        token:token,
        role_id:data.role_id,
        is_verified:false
    })

    return {createUser,token}
}

const sendEmail = async (data, token) => {

    const verifyLink = `http://localhost:3000/verify?token=${token}`;

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: "Verify your account",
        html: `
            <p>Please verify your account:</p>

            <a href="${verifyLink}"
               style="padding:10px 20px;background:#28a745;color:white;text-decoration:none;border-radius:5px;">
               Verify Account
            </a>
        `
    });
};

const verifyUsers = async (token) => {

    if (!token) {
        throw new Error("Invalid token");
    }

    const [updatedCount] = await User.update(
        { token: null, is_verified: true },
        {
            where: { token }
        }
    );

    if (updatedCount === 0) {
        throw new Error("Invalid or expired token");
    }

    return updatedCount;
};

const loginService = async(data) =>{
    const user = await User.findOne({where:{email:data.email}})
    console.log("user",user)
        if( user.is_verified == 0){
            const error = new Error("Please Verify Email")
            error.statusCode = 400
            throw error
        }


        if(user.status == 0){
             const error = new Error("Please contact admin your email is disabled")
            error.statusCode = 400
            throw error
        }

    if(!user){
        const error = new Error("Email not found")
        error.statusCode = 400
        throw error
    }

    const isMatch = await bcrypt.compare(
        data.password,
        user.password
    );

    const role_name = await Role.findOne({where:{id:user.role_id}})
    
   const token = jwt.sign(
  { id: user.id, email: user.email ,role:role_name.name },
  process.env.JWTACCESS,
  { expiresIn: "1h" }
);

  const refreshToken = jwt.sign({ id: user.id, email: user.email,role:role_name.name },
  process.env.JWTREFRESHTOKEN,
  { expiresIn: "1h" }
);

    if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.statusCode = 400;
        throw error;
    }

    return {
        user:{
            id:user.id,
            email:user.email,
            role:role_name.name
        },
        token,
        refreshToken
    };

}


const refreshTokenService = async(token) =>{
    const verifyToken = jwt.verify(token,process.env.JWTREFRESHTOKEN)

    const accesToken = jwt.sign({id:verifyToken.id},process.env.JWTACCESS,{expiresIn:"15m"})

    return accesToken
}

const getProfileService = async(authUserId) =>{
    const result = await User.findOne({where:{id:authUserId}
    ,
    attributes: ["id", "firstName", "lastName","email"],
    },)
 console.log("authUserId",result)
    return result
}

module.exports ={authService,sendEmail,verifyUsers,loginService,refreshTokenService,getProfileService}