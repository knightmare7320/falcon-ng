const model = require("../models/sites.js");

exports.getPerf = (req, res, next) => {
   const params = {
      groupType  : req.query.type,
      groupId    : req.query.id         ? +req.query.id          : null,
      orderDir   : req.query.orderDir   ? req.query.orderDir    : null,
      pageNumber : req.query.pageNumber ? +req.query.pageNumber : null,
      pageSize   : req.query.pageSize   ? +req.query.pageSize   : null,
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