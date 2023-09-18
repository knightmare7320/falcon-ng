class l5Markets {
   static get(db, params, result) {
      const sqlStr = 'CALL gui.get_l5_markets(?)';
      const sqlParams = [
         params.l4_market_id
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

module.exports = l5Markets;