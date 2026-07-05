function listItems(req, res) {
  res.render("items/index");
}

function showItem(req, res) {
  res.render("items/show");
}

function createItemGet(req, res) {
  res.render("items/new");
}

function createItemPost(req, res) {
  res.send("Create item POST - WIP");
}

function updateItemGet(req, res) {
  res.render("items/edit");
}

function updateItemPost(req, res) {
  res.send("Update item POST - WIP");
}

function deleteItemPost(req, res) {
  res.send("Delete item POST - WIP");
}

module.exports = {
  listItems,
  showItem,
  createItemGet,
  createItemPost,
  updateItemGet,
  updateItemPost,
  deleteItemPost,
};
