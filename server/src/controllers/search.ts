import Express from "express"
import Search from "../models/search.ts"

export function get(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const params = {
    searchString: req.query.q,
    pageNumber  : req.query.pageNumber ? +req.query.pageNumber : null,
    pageSize    : req.query.pageSize   ? +req.query.pageSize   : null,
  };   
  Search.get(
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
