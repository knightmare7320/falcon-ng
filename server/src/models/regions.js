export default class Regions {
  static get(db, result) {
    const sqlStr = 'CALL FalconCode.getRegions()';
    db.query(
      sqlStr,
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

  static getPerf(db, params, result) {
    const sqlStr = 'CALL FalconCode.getRegionsPerf(?, ?, ?, ?, ?)';
    const sqlParams = [
      params.filter_string,
      params.order_by,
      params.order_dir,
      params.page_number,
      params.page_size,
    ];
    // console.log(sqlStr, sqlParams);
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
          "totalRowCount": results[0][0].totalRowCount,
          "rows": results[1].map(({regionId, regionName, ...row}) => {return {id: regionId, name: regionName, ...row}})
        });
      }
    );      
  }
}