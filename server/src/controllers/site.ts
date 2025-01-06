import Express from "express"
import Site from "../models/site.ts"

export function get(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const params = {
    cascadeCode: req.params.cascadeCode,
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
}

export function updateSite(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const params = {
    siteId          : req.params.siteId,
    cascadeCode     : req.body.cascadeCode,
    siteName        : req.body.siteName,
    siteTypeId      : req.body.siteTypeId,
    address         : req.body.address,
    city            : req.body.city,
    state           : req.body.state,
    zipCode         : req.body.zipCode,
    county          : req.body.county,
    latitude        : req.body.latitude,
    longitude       : req.body.longitude,
    elevationFeet   : req.body.elevationFeet,
    structureTypeId : req.body.structureTypeId,
    repairPriorityId: req.body.repairPriorityId,
    timezoneId      : req.body.timezoneId,
    orgClusterId    : req.body.orgClusterId,
    userId          : req.body.userId,
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
}

export function getBts(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const params = {
    cascadeCode: req.params.cascadeCode,
  };
  Site.getBts(
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

export function getSectors(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const params = {
    cascadeCode: req.params.cascadeCode,
  };
  Site.getSectors(
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

export function getCarriers(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const params = {
    cascadeCode: req.params.cascadeCode,
  };
  Site.getCarriers(
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

export function getNearest(req: Express.Request, res: Express.Response) {
  const params = {
    cascadeCode: req.params.cascadeCode,
  };
  Site.getNearest(
    req.app.locals.db,
    params,
    (err, result) => {
      if (err)
        res.status(500).json({ message: err });
      else
        res.status(200).json( result );
    }
  );
}

export function getSiteTypes(req: Express.Request, res: Express.Response) {
  Site.getSiteTypes(
    req.app.locals.db,
    (err, result) => {
      if (err)
        res.status(500).json({ message: err });
      else
        res.status(200).json( result );
    }
  );
}
export function getRepairPriorities(req: Express.Request, res: Express.Response) {
  Site.getRepairPriorities(
    req.app.locals.db,
    (err, result) => {
      if (err)
        res.status(500).json({ message: err });
      else
        res.status(200).json( result );
    }
  );
}
export function getStructureTypes(req: Express.Request, res: Express.Response) {
  Site.getStructureTypes(
    req.app.locals.db,
    (err, result) => {
      if (err)
        res.status(500).json({ message: err });
      else
        res.status(200).json( result );
    }
  );
}
export function getTimezones(req: Express.Request, res: Express.Response) {
  Site.getTimezones(
    req.app.locals.db,
    (err, result) => {
      if (err)
        res.status(500).json({ message: err });
      else
        res.status(200).json( result );
    }
  );
}