const express = require("express");
const router = express.Router();

const controller = require("../controllers/site");

router.get("/site_types"            , controller.getSiteTypes);
router.get("/repair_priorities"     , controller.getRepairPriorities);
router.get("/structure_types"       , controller.getStructureTypes);
router.get("/timezones"             , controller.getTimezones);

router.get("/:cascade_code/carriers", controller.getCarriers);
router.get("/:cascade_code/sectors" , controller.getSectors);
router.get("/:cascade_code/bts"     , controller.getBts);
router.get("/:cascade_code/nearest" , controller.getNearest);
router.get("/:cascade_code"         , controller.get);

router.put("/:site_id", controller.updateSite);

module.exports = router;