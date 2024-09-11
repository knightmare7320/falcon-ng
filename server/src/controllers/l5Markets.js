const model = require("../models/l5Markets.js");

exports.get = (req, res, next) => {
   const params = {
      l4MarketId: req.params.l4MarketId ? +req.params.l4MarketId: null,
   }
   model.get(
      req.app.locals.db,
      params,
      (err, result) => {
         if (err)
            res.status(500).json({ message: err });
         else
            res.status(200).json(result);
      }
   );
};

exports.getPerf = (req, res, next) => {
   const params = {
      l4MarketId: req.params.l4MarketId ? +req.params.l4MarketId: null,
      filterString  : req.query.filterString,
      orderBy    : req.query.orderBy      ? req.query.orderBy     : null,
      orderDir   : req.query.orderDir     ? req.query.orderDir    : null,
      pageNumber : req.query.pageNumber   ? +req.query.pageNumber : null,
      pageSize   : req.query.pageSize     ? +req.query.pageSize   : null,
   };
   model.getPerf(
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