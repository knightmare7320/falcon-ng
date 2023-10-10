const express = require("express");
const router = express.Router();

const controller = require("../controllers/geo");

router.get("/sites/:Z/:X/:Y", controller.getSites);
router.get("/sectors/:Z/:X/:Y", controller.getSectors);

module.exports = router;