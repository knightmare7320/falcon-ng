const Site = require("../models/site.js");

exports.get = (req, res, next) => {
    const params = {
       cascade_code: req.params.cascade_code,
    };
    Site.get(
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