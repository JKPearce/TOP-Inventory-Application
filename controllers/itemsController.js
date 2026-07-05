const itemsModel = require("../models/itemsModel");
const categoriesModel = require("../models/categoriesModel");
const manufacturersModel = require("../models/manufacturersModel");

function listItems(req, res) {
  res.render("items/index");
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
