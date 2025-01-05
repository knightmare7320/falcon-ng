export default class Search {
  static get(db, params, result) {
    const sqlStr = 'CALL FalconCode.getQuickSearch(?,?,?)';
    const sqlParams = [
      params.searchString,
      params.pageNumber,
      params.pageSize,
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
          "totalRowCount": results[0][0].totalRowCount,
          "rows": results[1],
        });
      }
    );      
  }
}