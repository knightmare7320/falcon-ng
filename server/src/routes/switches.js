const express = require("express");
const router = express.Router();

const controller = require("../controllers/switches");

router.get("/", controller.get);
router.get("/perf", controller.getPerf);

module.exports = router;