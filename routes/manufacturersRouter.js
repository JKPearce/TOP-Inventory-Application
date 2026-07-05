const express = require("express");
const manufacturersController = require("../controllers/manufacturersController");

const router = express.Router();

router.get("/", manufacturersController.listManufacturers);
router.get("/new", manufacturersController.createManufacturerGet);
router.post("/new", manufacturersController.createManufacturerPost);
router.get("/:id", manufacturersController.showManufacturer);
router.get("/:id/edit", manufacturersController.updateManufacturerGet);
router.post("/:id/edit", manufacturersController.updateManufacturerPost);
router.post("/:id/delete", manufacturersController.deleteManufacturerPost);

module.exports = router;
