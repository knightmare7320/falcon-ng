const express = require("express");
const router = express.Router();

const controller = require("../controllers/mtas");

router.get("/", controller.get);
router.get("/perf", controller.getPerf);

module.exports = router;