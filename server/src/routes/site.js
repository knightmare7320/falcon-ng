import { Router } from "express";
const router = Router();

import { getSiteTypes, getRepairPriorities, getStructureTypes, getTimezones, getCarriers, getSectors, getBts, getNearest, get, updateSite } from "../controllers/site.js";

router.get("/siteTypes"            , getSiteTypes);
router.get("/repairPriorities"     , getRepairPriorities);
router.get("/structureTypes"       , getStructureTypes);
router.get("/timezones"             , getTimezones);

router.get("/:cascadeCode/carriers", getCarriers);
router.get("/:cascadeCode/sectors" , getSectors);
router.get("/:cascadeCode/bts"     , getBts);
router.get("/:cascadeCode/nearest" , getNearest);
router.get("/:cascadeCode"         , get);

router.put("/:siteId", updateSite);

export default router;