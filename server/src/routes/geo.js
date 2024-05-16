const express = require("express");
const router = express.Router();

const controller = require("../controllers/geo");

router.get("/tile/sites/:Z/:X/:Y", controller.getSiteTiles);
router.get("/bounds/sites", controller.getSiteBounds);
router.get("/tile/sectors/:Z/:X/:Y", controller.getSectorTiles);
router.get("/bounds/sectors", controller.getSectorBounds);

router.get("/json/sites/:Z/:X/:Y", controller.getSiteJson);

module.exports = router;