const express = require("express");
const router = express.Router();

const controller = require("../controllers/bscs");

router.get("/perf/:mscId?", controller.getPerf);
router.get("/:mscId?", controller.get);

module.exports = router;