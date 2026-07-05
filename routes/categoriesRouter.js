const express = require("express");
const categoriesController = require("../controllers/categoriesController");

const router = express.Router();

router.get("/", categoriesController.listCategories);
router.get("/new", categoriesController.createCategoryGet);
router.post("/new", categoriesController.createCategoryPost);
router.get("/:id", categoriesController.showCategory);
router.get("/:id/edit", categoriesController.updateCategoryGet);
router.post("/:id/edit", categoriesController.updateCategoryPost);
router.post("/:id/delete", categoriesController.deleteCategoryPost);

module.exports = router;
