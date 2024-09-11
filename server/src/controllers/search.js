const model = require("../models/search.js");

exports.get = (req, res, next) => {
  const params = {
    searchString: req.query.q,
    pageNumber  : req.query.pageNumber ? +req.query.pageNumber : null,
    pageSize    : req.query.pageSize   ? +req.query.pageSize   : null,
 };   model.get(
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
