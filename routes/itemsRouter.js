const express = require("express");
const itemsController = require("../controllers/itemsController");

const router = express.Router();

router.get("/", itemsController.listItems);

router.get("/new", itemsController.createItemGet);
router.post("/new", itemsController.createItemPost);

router.get("/:id", itemsController.showItem);

router.get("/:id/edit", itemsController.updateItemGet);
router.post("/:id/edit", itemsController.updateItemPost);

router.post("/:id/delete", itemsController.deleteItemPost);

module.exports = router;
