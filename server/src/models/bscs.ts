export default class Bscs {
  static get(db, params, result) {
    const sqlStr = 'CALL FalconCode.getBscs(?, ?)';
    const sqlParams = [
      params.mscId,
      params.equipmentVendorId,
    ]
    console.log(sqlStr, sqlParams);
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

  static getPerf(db, params, result) {
    const sqlStr = 'CALL FalconCode.getBscsPerf(?, ?, ?, ?, ?, ?, ?)';
    const sqlParams = [
      params.mscId,
      params.equipmentVendorId,
      params.filterString,
      params.orderBy,
      params.orderDir,
      params.pageNumber,
      params.pageSize,
    ];
    console.log(sqlStr, sqlParams);
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
          "mscName": results[0][0].mscName,
          "totalRowCount": results[0][0].totalRowCount,
          "rows": results[1]
        });
      }
    );      
  }
}