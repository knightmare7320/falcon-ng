const express = require("express");
const router = express.Router();

const controller = require("../controllers/l5_markets");

router.get("/:l4_market_id?", controller.get);
router.get("/:l4_market_id/perf", controller.getPerf);

module.exports = router;