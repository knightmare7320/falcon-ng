import Site from "../models/site.js";

export function get(req, res, next) {
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

export function updateSite(req, res, next) {
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

export function getBts(req, res, next) {
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

export function getSectors(req, res, next) {
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

export function getCarriers(req, res, next) {
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

export function getNearest(req, res) {
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

export function getSiteTypes(req, res) {
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
export function getRepairPriorities(req, res) {
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
export function getStructureTypes(req, res) {
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
export function getTimezones(req, res) {
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