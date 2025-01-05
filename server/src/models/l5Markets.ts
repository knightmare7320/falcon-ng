export default class l5Markets {
  static get(db, params, result) {
    const sqlStr = 'CALL FalconCode.getL5Markets(?)';
    const sqlParams = [
      params.l4MarketId
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
        result(null, results[0]);
      }
    );      
  }

  static getPerf(db, params, result) {
    const sqlStr = 'CALL FalconCode.getL5MarketsPerf(?, ?, ?, ?, ?, ?)';
    const sqlParams = [
      params.l4MarketId,
      params.filterString,
      params.orderBy,
      params.orderDir,
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
          "parentId": results[0][0].parentId,
          "parentName": results[0][0].parentName,
          "id": results[0][0].groupId,
          "name": results[0][0].groupName,
          "totalRowCount": results[0][0].totalRowCount,
          "rows": results[1].map(({l5MarketId, l5MarketName, ...row}) => {return {id: l5MarketId, name: l5MarketName, ...row}})
        });
      }
    );   
  }
}