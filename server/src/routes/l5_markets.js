const express = require("express");
const router = express.Router();

const controller = require("../controllers/l5_markets");

router.get("/perf/:l4_market_id", controller.getPerf);
router.get("/:l4_market_id?", controller.get);

module.exports = router;