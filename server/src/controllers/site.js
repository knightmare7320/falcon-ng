const model = require("../models/site.js");

exports.get = (req, res, next) => {
   const params = {
      cascadeCode: req.params.cascadeCode,
   };
   model.get(
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

exports.updateSite = (req, res, next) => {
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
  model.get(
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

exports.getBts = (req, res, next) => {
   const params = {
      cascadeCode: req.params.cascadeCode,
   };
   model.getBts(
      req.app.locals.db,
      params,
      (err, result) => {
         if (err)
            res.status(500).json({ message: err });
         else
            res.status(200).json(result);
      }
   );
};

exports.getSectors = (req, res, next) => {
   const params = {
      cascadeCode: req.params.cascadeCode,
   };
   model.getSectors(
      req.app.locals.db,
      params,
      (err, result) => {
         if (err)
            res.status(500).json({ message: err });
         else
            res.status(200).json(result);
      }
   );
};

exports.getCarriers = (req, res, next) => {
   const params = {
      cascadeCode: req.params.cascadeCode,
   };
   model.getCarriers(
      req.app.locals.db,
      params,
      (err, result) => {
         if (err)
            res.status(500).json({ message: err });
         else
            res.status(200).json(result);
      }
   );
};

exports.getNearest = (req, res) => {
   const params = {
      cascadeCode: req.params.cascadeCode,
   };
   model.getNearest(
      req.app.locals.db,
      params,
      (err, result) => {
         if (err)
            res.status(500).json({ message: err });
         else
            res.status(200).json( result );
      }
   );
};

exports.getSiteTypes = (req, res) => {
  model.getSiteTypes(
     req.app.locals.db,
     (err, result) => {
        if (err)
           res.status(500).json({ message: err });
        else
           res.status(200).json( result );
     }
  );
};
exports.getRepairPriorities = (req, res) => {
  model.getRepairPriorities(
     req.app.locals.db,
     (err, result) => {
        if (err)
           res.status(500).json({ message: err });
        else
           res.status(200).json( result );
     }
  );
};
exports.getStructureTypes = (req, res) => {
  model.getStructureTypes(
     req.app.locals.db,
     (err, result) => {
        if (err)
           res.status(500).json({ message: err });
        else
           res.status(200).json( result );
     }
  );
};
exports.getTimezones = (req, res) => {
  model.getTimezones(
     req.app.locals.db,
     (err, result) => {
        if (err)
           res.status(500).json({ message: err });
        else
           res.status(200).json( result );
     }
  );
};