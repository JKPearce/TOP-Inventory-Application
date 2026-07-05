const categoriesModel = require("../models/categoriesModel");
const itemsModel = require("../models/itemsModel");

async function listCategories(req, res) {
  const categories = await categoriesModel.getAllCategories();

  res.render("categories/index", {
    categories,
  });
}

async function showCategory(req, res) {
  const { id } = req.params;

  const category = await categoriesModel.getCategoryById(id);

  if (!category) {
    return res.status(404).send("Category not found");
  }

  const items = await itemsModel.getItemsByCategoryId(id);

  res.render("categories/show", {
    category,
    items,
  });
}

function createCategoryGet(req, res) {
  res.render("categories/new");
}

function createCategoryPost(req, res) {
  res.send("Create category POST - WIP");
}

function updateCategoryGet(req, res) {
  res.render("categories/edit");
}

function updateCategoryPost(req, res) {
  res.send("Update category POST - WIP");
}

function deleteCategoryPost(req, res) {
  res.send("Delete category POST - WIP");
}

module.exports = {
  listCategories,
  showCategory,
  createCategoryGet,
  createCategoryPost,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategoryPost,
};
