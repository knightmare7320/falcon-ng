class Sites {
   static get(db, params, result) {
      const sqlStr = 'CALL gui.get_sites(?, ?, ?, ?, ?, ?, ?)';
      const sqlParams = [ params.filter_on,
         params.filter_id,
         params.order_by,
         params.order_dir,
         params.page_number,
         params.page_size,
         'site',
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
            result(null, {
               "total_records": results[0][0].total_records,
               "rows": results[1]
            });
         }
      );      
   }
}

module.exports = Sites;