const model = require("../models/search.js");

exports.get = (req, res, next) => {
  const params = {
    search_string: req.query.q,
    page_number  : req.query.page_number ? +req.query.page_number : null,
    page_size    : req.query.page_size   ? +req.query.page_size   : null,
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
