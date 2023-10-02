const express = require("express");
const router = express.Router();

const controller = require("../controllers/bscs");

router.get("/perf", controller.getPerf);
router.get(":switch_id/perf", controller.getPerf);
router.get("/:switch_id?", controller.get);

module.exports = router;