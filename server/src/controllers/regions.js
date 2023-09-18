const model = require("../models/regions.js");

exports.get = (req, res, next) => {
   model.get(
      req.app.locals.db,
      (err, result) => {
         if (err)
            res.status(500).json({ message: err });
         else
            res.status(200).json({ ...result });
      }
   );
};