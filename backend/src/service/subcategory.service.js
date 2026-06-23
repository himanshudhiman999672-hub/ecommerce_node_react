const Subcategory = require("../models/subcategories")

const postSubCategoryService = async (data, image) => {
  const checkSubCategoryExists = await Subcategory.findOne({
    where: { name: data.name }
  });

  if (checkSubCategoryExists) {
    const error = new Error("Subcategory already exists");
    error.statusCode = 400;
    throw error;
  }

  if (!data.category_id) {
    const error = new Error("Category id is required");
    error.statusCode = 400;
    throw error;
  }

  const slugData = data.name.trim().replace(/\s+/g, "-").toLowerCase();

  const result = await Subcategory.create({
    name: data.name,
    description: data.description,
    image: image,
    status: data.status,
    slug: slugData,
    Category_id: data.category_id
  });

  return result;
};

const getSubCategoryService = async()=>{
    const result = await Subcategory.findAll({where:{is_delete:0}});

    return result
}

const getSubCategoryByIdService = async(slug) =>{
    try{
    const result = await Subcategory.findOne(
        {where:{slug:slug}}
    )
    if(!result){
        const error = new Error("Subcategory not exists")
        error.statusCode = 401

        throw error
    }
    return result

    }catch(error){
        console.log(error)
    
    }

}

const updateSubCategoryBySlug = async(data,slug,image) =>{
      const checkData = await Subcategory.findOne({
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
        status: data.status,
        Category_id:data.category_id
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

    await Subcategory.update(
        updateData,
        {
            where:{ slug }
        }
    )

    const updatedCategory = await Subcategory.findOne({
        where:{
            slug: updateData.slug || slug
        }
    })

    return updatedCategory
}

const deleteBySlugService = async (slug) => {

    const subcategory = await Subcategory.findOne({
        where: { slug }
    });

    if (!subcategory) {
        const error = new Error("Subcategory not found");
        error.statusCode = 404;
        throw error;
    }

    await Subcategory.update(
        {
            is_delete: 1
        },
        {
            where: { slug }
        }
    );

    return true;
};
module.exports = {postSubCategoryService,getSubCategoryService,getSubCategoryByIdService,updateSubCategoryBySlug,deleteBySlugService}