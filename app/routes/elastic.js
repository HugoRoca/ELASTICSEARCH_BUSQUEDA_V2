const express = require("express");
const controller = require("../controllers/elastic");
const router = express.Router();

router.route("/").get(controller.obtener);

module.exports = router;