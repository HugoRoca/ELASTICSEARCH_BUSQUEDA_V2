const express = require("express");
const controller = require("../controllers/elastic");
const router = express.Router();

router.post("/", controller.obtener);

module.exports = router;