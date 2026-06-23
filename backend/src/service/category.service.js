const Category = require("../models/categories")
const SubCategory = require("../models/subcategories")
const postCategoryService = async(data) =>{
    const checkCategory = await Category.findOne({where:{name:data.name}})

    if(checkCategory){
        const error = new Error("Category already exists")
            error.statusCode = 400
            throw error
    }

    const slugData = data.name.replace(" ","-").toLowerCase()
    
    const result = await Category.create({
        name:data.name,
        description:data.description,
        image : data.image,
        status:data.status,
        slug:slugData
    })

    return result
}

const getCategoryBySlugService = async(slug) =>{
    const result = await Category.findOne({where:{slug:slug}})

    return result
}

const updateCategoryService = async(data, slug,sellerId) => {

    const checkData = await Category.findOne({
        where:{ slug }
    })

    if(!checkData){
        const error = new Error("Category not exists")
        error.statusCode = 400
        throw error
    }

    const updateData = {
        name: data.name,
        description: data.description,
        status: data.status
    }

    if(data.name){
        updateData.slug = data.name
            .trim()
            .replace(/\s+/g,"-")
            .toLowerCase()
    }

    if(data.image){
        updateData.image = data.image
    }

    await Category.update(
        updateData,
        {
            where:{ slug }
        }
    )

    const updatedCategory = await Category.findOne({
        where:{
            slug: updateData.slug || slug
        }
    })

    return updatedCategory
}

const deleteCategoryService = async(slug) => {

    const category = await Category.findOne({
        where:{ slug }
    })

    if(!category){
        throw new Error("Category not found")
    }

    await Category.update(
        {
            is_delete:1
        },
        {
            where:{ slug }
        }
    )

    return category
}

const getAllSubCat = async() =>{
const result = await Category.findAll({
include:[
    {
    model:SubCategory

    }
],limit:5
})

console.log("result",result)


return result
}

module.exports = {postCategoryService,getCategoryBySlugService,updateCategoryService,deleteCategoryService,getAllSubCat}