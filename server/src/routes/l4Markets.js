const express = require("express");
const router = express.Router();

const controller = require("../controllers/l4Markets");

router.get("/perf/:regionId", controller.getPerf);
router.get("/:regionId?", controller.get);

module.exports = router;