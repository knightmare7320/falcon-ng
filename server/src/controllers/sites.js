const model = require("../models/sites.js");

exports.getPerf = (req, res, next) => {
   const params = {
      group_type  : req.query.type,
      group_id    : req.query.id          ? +req.query.id          : null,
      order_by    : req.query.order_by    ? req.query.order_by     : null,
      order_dir   : req.query.order_dir   ? req.query.order_dir    : null,
      page_number : req.query.page_number ? +req.query.page_number : null,
      page_size   : req.query.page_size   ? +req.query.page_size   : null,
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