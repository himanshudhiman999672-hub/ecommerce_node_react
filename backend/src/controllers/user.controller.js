
const getAllUser = require("../service/user.service")
const getUser = async (req, res) => {
    const limit = 10;
    const page = Number(req.query.page) || 1;

    const offset = (page - 1) * limit;

    const result = await getAllUser(limit, page, offset);
    
    return res.status(200).json({
        message: "User retrieved successfully",
        data: result.rows,
        totalUsers: result.count,
        totalPages: Math.ceil(result.count / limit),
        currentPage: page,
        totalAdmins: result.totalAdmins,
    });
};

module.exports = getUser