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

async function createManufacturerPost(req, res) {
  const manufacturer = await manufacturersModel.createManufacturer(req.body);

  res.redirect(`/manufacturers/${manufacturer.id}`);
}

async function updateManufacturerGet(req, res) {
  const { id } = req.params;

  const manufacturer = await manufacturersModel.getManufacturerById(id);

  if (!manufacturer) {
    return res.status(404).send("Manufacturer not found");
  }

  res.render("manufacturers/edit", {
    manufacturer,
  });
}

async function updateManufacturerPost(req, res) {
  const { id } = req.params;

  const manufacturer = await manufacturersModel.updateManufacturer(
    id,
    req.body,
  );

  if (!manufacturer) {
    return res.status(404).send("Manufacturer not found");
  }

  res.redirect(`/manufacturers/${manufacturer.id}`);
}

async function deleteManufacturerPost(req, res) {
  const { id } = req.params;

  try {
    const deletedManufacturer = await manufacturersModel.deleteManufacturer(id);

    if (!deletedManufacturer) {
      return res.status(404).send("Manufacturer not found");
    }

    return res.redirect("/manufacturers");
  } catch (error) {
    console.log("ERROR CODE:", error.code);
    console.log("ERROR MESSAGE:", error.message);

    if (error.code === "23503") {
      return res
        .status(400)
        .send(
          "Cannot delete this manufacturer because it still has items assigned to it. Delete or move those items first.",
        );
    }

    return res
      .status(500)
      .send("Something went wrong deleting the manufacturer.");
  }
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
