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

async function createCategoryPost(req, res) {
  const category = await categoriesModel.createCategory(req.body);

  res.redirect(`/categories/${category.id}`);
}

async function updateCategoryGet(req, res) {
  const { id } = req.params;

  const category = await categoriesModel.getCategoryById(id);

  if (!category) {
    return res.status(404).send("Category not found");
  }

  res.render("categories/edit", {
    category,
  });
}

async function updateCategoryPost(req, res) {
  const { id } = req.params;

  const category = await categoriesModel.updateCategory(id, req.body);

  if (!category) {
    return res.status(404).send("Category not found");
  }

  res.redirect(`/categories/${category.id}`);
}

async function deleteCategoryPost(req, res) {
  const { id } = req.params;

  try {
    const deletedCategory = await categoriesModel.deleteCategory(id);

    if (!deletedCategory) {
      return res.status(404).send("Category not found");
    }

    return res.redirect("/categories");
  } catch (error) {
    console.log("DELETE CATEGORY ERROR CODE:", error.code);
    console.log("DELETE CATEGORY ERROR MESSAGE:", error.message);

    if (error.code === "23503" || error.code === "23001") {
      return res
        .status(400)
        .send(
          "Cannot delete this category because it still has items assigned to it. Delete or move those items first.",
        );
    }

    return res.status(500).send("Something went wrong deleting the category.");
  }
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
