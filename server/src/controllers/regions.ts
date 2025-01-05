import Regions from "../models/regions.js";

export function get(req, res, next) {
  Regions.get(
    req.app.locals.db,
    (err, result) => {
      if (err)
        res.status(500).json({ message: err });
      else
        res.status(200).json(result);
    } 
  );
}

export function getPerf(req, res, next) {
  const params = {
    filterString: req.query.filterString,
    orderBy     : req.query.orderBy      ? req.query.orderBy     : null,
    orderDir    : req.query.orderDir     ? req.query.orderDir    : null,
    pageNumber  : req.query.pageNumber   ? +req.query.pageNumber : null,
    pageSize    : req.query.pageSize     ? +req.query.pageSize   : null,
  };
  Regions.getPerf(
    req.app.locals.db,
    params,
    (err, result) => {
      if (err)
        res.status(500).json({ message: err });
      else
        res.status(200).json({ ...result });
    }
  );
}