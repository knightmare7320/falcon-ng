const model = require("../models/sites.js");

exports.get = (req, res, next) => {
   const params = {
      filter_on   : req.query.filter_on,
      filter_id   : req.query.filter_id   ? +req.query.filter_id   : null,
      order_by    : req.query.order_by    ? req.query.order_by     : null,
      order_dir   : req.query.order_dir   ? req.query.order_dir    : null,
      page_number : req.query.page_number ? +req.query.page_number : null,
      page_size   : req.query.page_size   ? +req.query.page_size   : null,
   };
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