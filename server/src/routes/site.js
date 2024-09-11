const express = require("express");
const router = express.Router();

const controller = require("../controllers/site");

router.get("/siteTypes"            , controller.getSiteTypes);
router.get("/repairPriorities"     , controller.getRepairPriorities);
router.get("/structureTypes"       , controller.getStructureTypes);
router.get("/timezones"             , controller.getTimezones);

router.get("/:cascadeCode/carriers", controller.getCarriers);
router.get("/:cascadeCode/sectors" , controller.getSectors);
router.get("/:cascadeCode/bts"     , controller.getBts);
router.get("/:cascadeCode/nearest" , controller.getNearest);
router.get("/:cascadeCode"         , controller.get);

router.put("/:siteId", controller.updateSite);

module.exports = router;