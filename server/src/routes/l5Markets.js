const express = require("express");
const router = express.Router();

const controller = require("../controllers/l5Markets");

router.get("/perf/:l4MarketId", controller.getPerf);
router.get("/:l4MarketId?", controller.get);

module.exports = router;