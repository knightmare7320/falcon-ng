const model = require("../models/l4_markets.js");

exports.get = (req, res, next) => {
   const params = {
      region_id: req.params.region_id ? +req.params.region_id: null,
   }
   model.get(
      req.app.locals.db,
      params,
      (err, result) => {
         if (err)
            res.status(500).json({ message: err });
         else
            res.status(200).json({ ...result });
      }
   );
};