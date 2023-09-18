class l4Markets {
   static get(db, params, result) {
      const sqlStr = 'CALL gui.get_l4_markets(?)';
      const sqlParams = [
         params.region_id
      ]
      console.log(sqlParams);
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

module.exports = l4Markets;