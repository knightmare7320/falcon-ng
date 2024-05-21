const express = require("express");
const router = express.Router();

const controller = require("../controllers/market99s");

router.get("/perf/:region_id", controller.getPerf);
router.get("/:region_id?", controller.get);

module.exports = router;