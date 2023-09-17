const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
   res.status(200).json({
      "site": "hello world",
   });
});

router.get("/:cascade_code", (req, res, next) => {
   res.status(200).json({
      "site": req.params.cascade_code,
   });
});

module.exports = router;