const express = require("express");
const router = express.Router();

const controller = require("../controllers/org_clusters");

router.get("/:l5_market_id?", controller.get);
router.get("/:l5_market_id/perf", controller.getPerf);

module.exports = router;