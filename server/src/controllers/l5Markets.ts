import Express from "express"
import L5Markets from "../models/l5Markets.ts"

export function get(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const params = {
    l4MarketId: req.params.l4MarketId ? +req.params.l4MarketId: null,
  }
  L5Markets.get(
    req.app.locals.db,
    params,
    (err, result) => {
      if (err)
        res.status(500).json({ message: err });
      else
        res.status(200).json(result);
    }
  );
}

export function getPerf(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const params = {
    l4MarketId: req.params.l4MarketId ? +req.params.l4MarketId: null,
    filterString  : req.query.filterString,
    orderBy    : req.query.orderBy      ? req.query.orderBy     : null,
    orderDir   : req.query.orderDir     ? req.query.orderDir    : null,
    pageNumber : req.query.pageNumber   ? +req.query.pageNumber : null,
    pageSize   : req.query.pageSize     ? +req.query.pageSize   : null,
  };
  L5Markets.getPerf(
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