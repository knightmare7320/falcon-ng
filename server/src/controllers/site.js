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