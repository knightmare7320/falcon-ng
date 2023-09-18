class Regions {
   static get(db, result) {
      const sqlStr = 'CALL gui.get_regions()';
      db.query(
         sqlStr,
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

module.exports = Regions;