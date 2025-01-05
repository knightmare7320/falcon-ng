import Bscs from "../models/bscs.js";

export function get(req, res, next) {
  const params = {
    switch_id: req.params.mscId ? +req.params.mscId: null,
    equipment_vendor_id: req.query.equipmentVendorId ? +req.query.equipmentVendorId: null,
  }
  Bscs.get(
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
    mscId       : req.params.mscId       ? +req.params.mscId     : null,
    equipmentVendorId: req.query.equipmentVendorId ? +req.query.equipmentVendorId : null,
    filterString: req.query.filterString,
    orderBy     : req.query.orderBy      ? req.query.orderBy     : null,
    orderDir    : req.query.orderDir     ? req.query.orderDir    : null,
    pageNumber  : req.query.pageNumber   ? +req.query.pageNumber : null,
    pageSize    : req.query.pageSize     ? +req.query.pageSize   : null,
  };
  Bscs.getPerf(
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