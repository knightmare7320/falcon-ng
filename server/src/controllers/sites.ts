import Express from "express"
import Sites from "../models/sites.ts"

export function getPerf(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const params = {
    groupType  : req.query.type,
    groupId    : req.query.id         ? +req.query.id          : null,
    orderDir   : req.query.orderDir   ? req.query.orderDir    : null,
    pageNumber : req.query.pageNumber ? +req.query.pageNumber : null,
    pageSize   : req.query.pageSize   ? +req.query.pageSize   : null,
  };
  Sites.getPerf(
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