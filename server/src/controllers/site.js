const model = require("../models/site.js");

exports.get = (req, res, next) => {
   const params = {
      cascade_code: req.params.cascade_code,
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
    site_id           : req.params.site_id,
    cascade_code      : req.body.cascade_code,
    site_name         : req.body.site_name,
    site_type_id      : req.body.site_type_id,
    address1          : req.body.address1,
    city              : req.body.city,
    state             : req.body.state,
    zip_code          : req.body.zip_code,
    county            : req.body.county,
    latitude          : req.body.latitude,
    longitude         : req.body.longitude,
    elevation_feet    : req.body.elevation_feet,
    structure_type_id : req.body.structure_type_id,
    repair_priority_id: req.body.repair_priority_id,
    timezone_id       : req.body.timezone_id,
    region_id         : req.body.region_id,
    l4_market_id      : req.body.l4_market_id,
    l5_market_id      : req.body.l5_market_id,
    org_cluster_id    : req.body.org_cluster_id,
    user_id           : req.body.user_id,
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
      cascade_code: req.params.cascade_code,
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
      cascade_code: req.params.cascade_code,
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
      cascade_code: req.params.cascade_code,
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
      cascade_code: req.params.cascade_code,
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