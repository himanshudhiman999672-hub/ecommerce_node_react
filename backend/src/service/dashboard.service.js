const { Op } = require("sequelize");

const Address = require("../models/Address");
const Order = require("../models/Order");
const Product = require("../models/product");
const OrderItem = require("../models/OrderItem");

const getDataService = async (authUserId) => {
    const [
        totalOrders,
        totalActiveOrder,
        totalAddress,
        recentOrders,
        totalOrdersNew
    ] = await Promise.all([
        // Product.findAll({
        //   attributes: ["id", "name", "price", "slug", "stock"],
        //   limit: 10,
        //   order: [["createdAt", "DESC"]],
        // }),

        Order.count({
            where: {
                user_id: authUserId,
            },
        }),
   

    Order.count({
        where: {
            user_id: authUserId,
            order_status: {
                [Op.in]: ["pending", "confirmed", "packed", "shipped"],
            },
        },
    }),

        Address.count({
            where: {
                user_id: authUserId,
            },
        }),

        Order.findAll({
            where: {
                user_id: authUserId,
            },
            include: [
    {
      model: OrderItem,
      include: [
        {
          model: Product,
        },
      ],
    },
  ],
            limit: 5,
            order: [["createdAt", "DESC"]],
        }),

        Order.findAll({
            where: {
                user_id: authUserId,
            },
            include: [
    {
      model: OrderItem,
      include: [
        {
          model: Product,
        },
      ],
    },
  ],
            order: [["createdAt", "DESC"]],
        }),
  ]);

return {
    totalOrders,
    totalActiveOrder,
    totalAddress,
    recentOrders,
    totalOrdersNew
};
};

module.exports = getDataService;