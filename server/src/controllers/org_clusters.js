const model = require("../models/org_clusters.js");

exports.get = (req, res, next) => {
   const params = {
      l5_market_id: req.params.l5_market_id ? +req.params.l5_market_id: null,
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