class Site {
  static get(db, params, result) {
    db.query(
      'call get_site(?)',
      [params.cascade_code],
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
    const sqlStr = 'call update_site(?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?, ?,?,?,?,?)';
    const sqlParams = [
      params.site_id,
      params.cascade_code,
      params.site_name,
      params.site_type_id,
      params.address1,
      params.city,
      params.state,
      params.zip_code,
      params.county,
      params.latitude,
      params.longitude,
      params.elevation_feet,
      params.structure_type_id,
      params.repair_priority_id,
      params.timezone_id,
      params.region_id,
      params.l4_market_id,
      params.l5_market_id,
      params.org_cluster_id,
      params.user_id,
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
      'call get_site_bts(?)',
      [params.cascade_code],
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
      'call get_site_sectors(?)',
      [params.cascade_code],
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
      'call get_site_carriers(?)',
      [params.cascade_code],
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
      'call get_nearest_sites(?)',
      [params.cascade_code],
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
         'call get_site_types()',
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
         'call get_structure_types()',
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
        'call get_repair_priorities()',
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
         'call get_timezones()',
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