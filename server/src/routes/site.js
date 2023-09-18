const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
   res.status(200).json({
      "site": "hello world",
   });
});

const SiteController = require("../controllers/site");

router.get("/:cascade_code", SiteController.get);


module.exports = router;