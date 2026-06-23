const path = require("path")

require("dotenv").config({
   path: path.resolve(__dirname, "../../.env")
})
console.log("path",__dirname,"../.env")
const { Sequelize } = require("sequelize")
console.log("sdsd",process.env.DBUSER)
console.log("sdsds",process.env.DBPASSWORD)
console.log("asasas",process.env.DBHOST)
console.log("lwqkwle",process.env.DBNAME)
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.DBHOST,
    dialect: 'mysql',
    logging: false
  }
)

sequelize.authenticate()
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err))

module.exports = sequelize