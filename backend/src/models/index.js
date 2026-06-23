const Categories = require("./categories")
const Product = require("./product")
const User = require("./User")
const ProductImage = require("./productImage")
const Cart = require("./cart")
const Wishlist = require("./wishlist")
const Order = require("./Order")
const OrderItem = require("./OrderItem")
const Address = require("./Address")
const Role = require("./Role")
const Subcategory = require("./subcategories")
const Category = require("./categories")

Categories.hasMany(Product,{
    foreignKey:"category_id"
})

Product.belongsTo(Categories,{
    foreignKey:"category_id"
})

Categories.hasMany(Subcategory,{
    foreignKey:"Category_id"
})

Subcategory.belongsTo(Categories,{
    foreignKey:"Category_id"
})

User.hasMany(Order,{
    foreignKey:"user_id"
})

Order.belongsTo(User,{
    foreignKey:"user_id"
})

User.hasMany(Product,{
    foreignKey:"seller_id"
})

Product.belongsTo(User,{
    foreignKey:"seller_id"
})

Product.hasMany(ProductImage,{
    foreignKey:"product_id"
})

ProductImage.belongsTo(Product,{
    foreignKey:"product_id"
})



Cart.belongsTo(Product,{
    foreignKey:"product_id"
})

Product.hasMany(Cart,{
    foreignKey:"product_id"
})

User.hasMany(Cart,{
    foreignKey:"user_id"
})

Cart.belongsTo(User,{
    foreignKey:"user_id"
})

Product.hasMany(Wishlist,{
    foreignKey:"product_id"
})

Wishlist.belongsTo(Product,{
    foreignKey:"product_id"
})

Product.hasMany(OrderItem,{
    foreignKey:"product_id"
})

OrderItem.belongsTo(Product,{
    foreignKey:"product_id"
})

Order.hasMany(OrderItem,{
    foreignKey:"order_id"
})

OrderItem.belongsTo(Order,{
    foreignKey:"order_id"
})

Address.hasMany(Order,{
    foreignKey:"address_id"
})

Order.belongsTo(Address,{
    foreignKey:"address_id"
})

Role.hasMany(User, {
    foreignKey: "role_id"
});

User.belongsTo(Role, {
    foreignKey: "role_id"
});

Product.belongsTo(Category, {
  foreignKey: "category_id"
});

Category.hasMany(Product, {
  foreignKey: "category_id"
});