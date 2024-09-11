class Site {
  static get(db, params, result) {
    db.query(
      'call FalconCode.getSite(?)',
      [params.cascadeCode],
      function(err, results) {
        if (err) {
          console.error(err);
          result(err, null);
          return;
        }
        result(null, results[0][0]);
      }
    );
  }

  static update(db, params, result) {
    const sqlStr = 'call FalconCode.updateSite(?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?)';
    const sqlParams = [
      params.siteId,
      params.cascadeCode,
      params.siteName,
      params.siteTypeId,
      params.address,
      params.city,
      params.state,
      params.zipCode,
      params.county,
      params.latitude,
      params.longitude,
      params.elevationFeet,
      params.structureTypeId,
      params.repairPriorityId,
      params.timezoneId,
      params.orgClusterId,
      params.userId,
    ];
    db.query(
      sqlStr,
      sqlParams,
      function(err, results) {
        if (err) {
          console.error(err);
          result(err, null);
          return;
        }
        result(null, results[0][0]);
      }
    );
  }

  static getBts(db, params, result) {
    db.query(
      'call FalconCode.getSiteBts(?)',
      [params.cascadeCode],
      function(err, results) {
        if (err) {
          console.error(err);
          result(err, null);
          return;
        }
        result(null, results[0]);
      }
    );
  }

  static getSectors(db, params, result) {
    db.query(
      'call FalconCode.getSiteSectors(?)',
      [params.cascadeCode],
      function(err, results) {
        if (err) {
          console.error(err);
          result(err, null);
          return;
        }
        result(null, results[0]);
      }
    );
  }

  static getCarriers(db, params, result) {
    db.query(
      'call FalconCode.getSiteCarriers(?)',
      [params.cascadeCode],
      function(err, results) {
        if (err) {
          console.error(err);
          result(err, null);
          return;
        }
        result(null, results[0]);
      }
    );
  }

  static getNearest(db, params, result) {
    db.query(
      'call FalconCode.getNearestSites(?)',
      [params.cascadeCode],
      function(err, results) {
        if (err) {
          console.error(err);
          result(err, null);
          return;
        }
        result(null, results[0]);
      }
    );
  }

   static getSiteTypes(db, result) {
      db.query(
         'call FalconCode.getSiteTypes()',
         function(err, results) {
            if (err) {
               console.error(err);
               result(err, null);
               return;
            }
            result(null, results[0]);
         }
      );
   }
   static getStructureTypes(db, result) {
      db.query(
         'call FalconCode.getStructureTypes()',
         function(err, results) {
            if (err) {
               console.error(err);
               result(err, null);
               return;
            }
            result(null, results[0]);
         }
      );
   }
   static getRepairPriorities(db, result) {
      db.query(
        'call FalconCode.getRepairPriorities()',
        function(err, results) {
          if (err) {
            console.error(err);
            result(err, null);
            return;
          }
          result(null, results[0]);
        }
      );
   }
   static getTimezones(db, result) {
      db.query(
         'call FalconCode.getTimezones()',
         function(err, results) {
            if (err) {
               console.error(err);
               result(err, null);
               return;
            }
            result(null, results[0]);
         }
      );
   }
}

module.exports = Site;