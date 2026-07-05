const manufacturersModel = require("../models/manufacturersModel");
const itemsModel = require("../models/itemsModel");

async function listManufacturers(req, res) {
  const manufacturers = await manufacturersModel.getAllManufacturers();

  res.render("manufacturers/index", {
    manufacturers,
  });
}

async function showManufacturer(req, res) {
  const { id } = req.params;

  const manufacturer = await manufacturersModel.getManufacturerById(id);

  if (!manufacturer) {
    return res.status(404).send("Manufacturer not found");
  }

  const items = await itemsModel.getItemsByManufacturerId(id);

  res.render("manufacturers/show", {
    manufacturer,
    items,
  });
}

function createManufacturerGet(req, res) {
  res.render("manufacturers/new");
}

function createManufacturerPost(req, res) {
  res.send("Create manufacturer POST - WIP");
}

function updateManufacturerGet(req, res) {
  res.render("manufacturers/edit");
}

function updateManufacturerPost(req, res) {
  res.send("Update manufacturer POST - WIP");
}

function deleteManufacturerPost(req, res) {
  res.send("Delete manufacturer POST - WIP");
}

module.exports = {
  listManufacturers,
  showManufacturer,
  createManufacturerGet,
  createManufacturerPost,
  updateManufacturerGet,
  updateManufacturerPost,
  deleteManufacturerPost,
};
