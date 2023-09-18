const model = require("../models/l5_markets.js");

exports.get = (req, res, next) => {
   const params = {
      l4_market_id: req.params.l4_market_id ? +req.params.l4_market_id: null,
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