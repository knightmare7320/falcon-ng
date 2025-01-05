import Mscs from "../models/mscs.ts";

export function get(req, res, next) {
  const params = {
    equipmentVendorId: req.query.equipmentVendorId ? +req.query.equipmentVendorId: null,
  }
  Mscs.get(
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

export function getPerf(req, res, next) {
  const params = {
    equipmentVendorId: req.query.equipmentVendorId ? req.query.equipmentVendorId : null,
    filterString  : req.query.filterString,
    orderBy    : req.query.orderBy      ? req.query.orderBy     : null,
    orderDir   : req.query.orderDir     ? req.query.orderDir    : null,
    pageNumber : req.query.pageNumber   ? +req.query.pageNumber : null,
    pageSize   : req.query.pageSize     ? +req.query.pageSize   : null,
  };
  Mscs.getPerf(
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