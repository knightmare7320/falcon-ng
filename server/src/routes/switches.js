const express = require("express");
const router = express.Router();

const controller = require("../controllers/switches");

router.get("/perf", controller.getPerf);
router.get("/", controller.get);

module.exports = router;