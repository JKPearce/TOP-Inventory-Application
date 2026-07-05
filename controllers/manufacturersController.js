function listManufacturers(req, res) {
  res.render("manufacturers/index");
}

function showManufacturer(req, res) {
  res.render("manufacturers/show");
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
