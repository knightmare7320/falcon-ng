const mysql = require("mysql2");

class Site {

   static get(db, params, result) {

      db.query(
         'call get_site_info(?)',
         [params.cascade_code],
         function(err, results) {
            if (err) {
               console.error(err);
               result(err, null);
               return;
            }
            console.log(results); // results contains rows returned by server
            result(null, results);
            // If you execute same statement again, it will be picked from a LRU cache
            // which will save query preparation time and give better performance
         }
      );

    //   request.input('OSS_ID', mssql.Int, oss.oss_id ? +oss.oss_id : -1);

    //   request.execute('gui.get_site_info', (err, res) => {
    //      if (err) {
    //         console.log("get oss ERROR: ", err);
    //         if (err && err.originalError && err.originalError.info && err.originalError.info.message)
    //            result(err.originalError.info.message, null);

    //         else
    //            result('Database error', null);
    //         return;
    //      }

    //      if (res.recordset.length > 0)
    //         result(null,
    //            {
    //               total_rows: res.recordset[0].total_count,
    //               rows: res.recordset.map(({ total_count, ...item }) => item),
    //            }
    //         );

    //      else
    //         result(null,
    //            {
    //               total_rows: 0,
    //               rows: [],
    //            }
    //         );
    //   });
   }

}

module.exports = Site;