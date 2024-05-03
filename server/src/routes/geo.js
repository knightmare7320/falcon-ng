const express = require("express");
const router = express.Router();

const controller = require("../controllers/geo");

router.get("/sitesTile/:Z/:X/:Y", controller.getSites);
router.get("/sites", controller.getSitesBounds);
router.get("/sectorsTile/:Z/:X/:Y", controller.getSectors);
router.get("/sectors", controller.getSectorsBounds);

module.exports = router;