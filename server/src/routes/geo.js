const express = require("express");
const router = express.Router();

const controller = require("../controllers/geo");

router.get("/sites/:Z/:X/:Y", controller.getSites);
router.get("/sites/bounds/:minX/:maxX/:minY/:maxY", controller.getSitesBounds);
router.get("/sectors/:Z/:X/:Y", controller.getSectors);
router.get("/sectors/bounds/:minX/:maxX/:minY/:maxY", controller.getSitesBounds);

module.exports = router;