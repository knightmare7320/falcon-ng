const express = require("express");
const router = express.Router();

const controller = require("../controllers/org_clusters");

router.get("/:l5_market_id?", controller.get);

module.exports = router;