const Category = require("../models/categories");
const {postCategoryService,getCategoryBySlugService, 
    updateCategoryService,deleteCategoryService,getAllSubCat} = require("../service/category.service");
const { message, description } = require("../validation/category");

const postCategories = async(req,res) =>{
    const {name,description,status,slug} = req.body;
    const image = req.file.filename;
    const data ={
        name,description,image,status,slug
    }

    const category = await postCategoryService(data)

    return res.status(201).json({message:"category Submited Sucessfully",data:category})

}

const getCategory = async(req,res) =>{
    const category = await Category.findAll({where:{is_delete:0}})

    return res.status(201).json({message:"Categories",data:category})
}

const getCategoryByslug = async(req,res) =>{
    const {slug} = req.params;

    const result = await getCategoryBySlugService(slug)

    return res.status(201).json({message:"Category Retrived",data:result})
}

const updateCategory = async(req,res) =>{
    const {slug} = req.params;
     const {name,description,status,slug:newSlug} = req.body;

    const image = req.file?.filename;

    const data ={
        name,
        description,
        status,
        image,
        slug:newSlug
    }
    const result = await  updateCategoryService(data,slug)

    return res.status(201).json({message:"Category updated",data:result})
}


const deleteCategory = async(req,res) =>{
    const {slug} = req.params;
    
    const result = await deleteCategoryService(slug)
    
    return res.status(201).json({message:"Category deleted",data:result})
}


//for all
const getSubcategoryForAll = async(req,res) =>{
    const result = await getAllSubCat();
    return res.status(201).json({
        message:"get All subcategory",
        data:result
    })
}
module.exports = {postCategories,getCategory,getCategoryByslug,updateCategory,deleteCategory,getSubcategoryForAll}