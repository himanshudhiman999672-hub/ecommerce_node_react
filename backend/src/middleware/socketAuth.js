const jwt = require("jsonwebtoken")

const socketAuth = (socket,next) =>{
    try{
        const token = socket.handshake.auth.token;

        if (!token) {
      return next(new Error("No token provided"));
    }

    const decoded = jwt.verify(token, process.env.JWTACCESS);

    socket.user = decoded;
    next();

    }catch(error){
        console.log("error",error)
    }
}


module.exports = socketAuth