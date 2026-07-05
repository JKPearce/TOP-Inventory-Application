function listCategories(req, res) {
  res.render("categories/index");
}

function showCategory(req, res) {
  res.render("categories/show");
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
