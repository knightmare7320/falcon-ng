const express = require("express");
const router = express.Router();

const controller = require("../controllers/site");

router.get("/:cascade_code/carriers", controller.getCarriers);
router.get("/:cascade_code/sectors", controller.getSectors);
router.get("/:cascade_code/bts", controller.getBts);
router.get("/:cascade_code", controller.get);

module.exports = router;