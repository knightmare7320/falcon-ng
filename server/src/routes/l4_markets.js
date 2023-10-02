const express = require("express");
const router = express.Router();

const controller = require("../controllers/l4_markets");

router.get("/:region_id?", controller.get);
router.get("/:region_id/perf", controller.getPerf);

module.exports = router;