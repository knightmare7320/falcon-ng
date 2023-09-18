class market99s {
   static get(db, params, result) {
      const sqlStr = 'CALL gui.get_market99s(?)';
      const sqlParams = [
         params.region_id
      ]
      db.query(
         sqlStr,
         sqlParams,
         function(err, results) {
            if (err) {
               console.error(err);
               result(err, null);
               return;
            }
            result(null, {
               "rows": results[0]
            });
         }
      );      
   }
}

module.exports = market99s;