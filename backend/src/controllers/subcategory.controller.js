const Subcategory = require("../models/subcategories");
const {postSubCategoryService,getSubCategoryService, getSubCategoryByIdService,updateSubCategoryBySlug,deleteBySlugService} = require("../service/subcategory.service")

const postSubCategory = async (req, res) => {
  const { name, description, status, category_id } = req.body;

  console.log("request body", req.body);

  const image = req.file ? req.file.filename : null;

  const data = {
    name,
    description,
    status,
    category_id
  };

  const result = await postSubCategoryService(data, image);

  return res.status(201).json({
    message: "Subcategory created successfully",
    data: result
  });
};

const getSubCategories = async(req,res)=>{

    const result = await getSubCategoryService();

    return res.status(201).json({message:"Subcategory Retrivved Successfully",data:result})
}

const getSubCategoryById = async(req,res) =>{
    const slug = req.params.slug;
    console.log("sdkjskdksdsjdjskjdkskdjkskjdjkskdkskjdkjskjk")

    const result = await getSubCategoryByIdService(slug)

    console.log("result",result)

    return res.status(201).json({message:"Subcategory retrived data",data:result})
}

const updateSlugById = async(req,res) =>{
    const slug = req.params.slug;
    const {name,description,status,category_id} = req.body;
    const image = req.file ? req.file.filename : null;


    const data = {
        name,
        description,
        status,
        category_id
    }
    const result = await updateSubCategoryBySlug(data,slug,image);

    return res.status(201).json({message:"Update Slug Retrived data",data:result})
}

const deleteSlug = async(req,res) =>{
    const slug = req.params.slug;
    
    const result = await deleteBySlugService(slug);
    
    return res.status(201).json({message:"Delete slug",data:result})

}


module.exports = {postSubCategory,getSubCategories,getSubCategoryById,updateSlugById,deleteSlug}