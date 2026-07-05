const itemsModel = require("../models/itemsModel");
const categoriesModel = require("../models/categoriesModel");
const manufacturersModel = require("../models/manufacturersModel");

async function listItems(req, res) {
  const items = await itemsModel.getAllItems();

  res.render("items/index", {
    items,
  });
}

async function showItem(req, res) {
  const { id } = req.params;

  const item = await itemsModel.getItemById(id);

  if (!item) {
    return res.status(404).send("Item not found");
  }

  res.render("items/show", {
    item,
  });
}

async function createItemGet(req, res) {
  const categories = await categoriesModel.getAllCategories();
  const manufacturers = await manufacturersModel.getAllManufacturers();

  res.render("items/new", {
    categories,
    manufacturers,
  });
}

async function createItemPost(req, res) {
  const item = await itemsModel.createItem(req.body);

  res.redirect(`/items/${item.id}`);
}

async function updateItemGet(req, res) {
  const { id } = req.params;

  const item = await itemsModel.getItemById(id);

  if (!item) {
    return res.status(404).send("Item not found");
  }

  const categories = await categoriesModel.getAllCategories();
  const manufacturers = await manufacturersModel.getAllManufacturers();

  res.render("items/edit", {
    item,
    categories,
    manufacturers,
  });
}

async function updateItemPost(req, res) {
  const { id } = req.params;

  const item = await itemsModel.updateItem(id, req.body);

  if (!item) {
    return res.status(404).send("Item not found");
  }

  res.redirect(`/items/${item.id}`);
}

async function deleteItemPost(req, res) {
  const { id } = req.params;

  const deletedItem = await itemsModel.deleteItem(id);

  if (!deletedItem) {
    return res.status(404).send("Item not found");
  }

  res.redirect("/items");
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
