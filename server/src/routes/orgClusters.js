const express = require("express");
const router = express.Router();

const controller = require("../controllers/orgClusters");

router.get("/perf/:l5MarketId", controller.getPerf);
router.get("/:l5MarketId?", controller.get);

module.exports = router;