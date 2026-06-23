const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const app = express()
require('dotenv').config()
const sequelize = require("./config/db")
const cors = require("cors")
const errorMiddleware = require("./middleware/error")
const authRoute = require("./routes/auth.route")
const categoryRoute = require("./routes/category.route")
const productRoute = require("./routes/product.route")
const cartRoute = require("./routes/cart.route")
const wishlistRoute = require("./routes/wishlist.route")
const OrderRoute = require("./routes/order.route")
const AddressRoute = require("./routes/address.route")
const postCouponCode = require("./routes/coupon.route")
const paymentRoute = require("./routes/payment.route")
const userRoute = require("./routes/user.route")
const SubcategoryRoute = require("./routes/subcategory.route")
const dashboardRoute = require("./routes/dashboard.route")
const notificationRoute = require("./routes/notification.route")
const path = require("path");
const server = http.createServer(app)
const { setIO } = require("./helper/socket/socket");
const socketAuth = require("./middleware/socketAuth");
const conversationRoute = require("./routes/conversation.route")

const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    credentials:true
  }
})

io.use(socketAuth);

setIO(io);

require("./models/index")
sequelize.sync().then(()=> console.log("Table Synced"))

const PORT = process.env.PORT || 1000;







app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

app.use("/api/v1",authRoute)
app.use("/api/v1",categoryRoute)
app.use("/api/v1",productRoute)
app.use("/api/v1",cartRoute)
app.use("/api/v1",wishlistRoute)
app.use("/api/v1",OrderRoute)
app.use("/api/v1",AddressRoute)
app.use("/api/v1",postCouponCode)
app.use("/api/v1",paymentRoute)
app.use("/api/v1",userRoute)
app.use("/api/v1",SubcategoryRoute)
app.use("/api/v1",dashboardRoute)
app.use("/api/v1",notificationRoute)
app.use("/api/v1",conversationRoute)
app.use(errorMiddleware)

server.listen(PORT,()=>{
    console.log(`server is listening at ${PORT}`)
})
