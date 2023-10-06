const express = require("express");
const router = express.Router();

const controller = require("../controllers/sites");

router.get("/perf", controller.getPerf);

module.exports = router;