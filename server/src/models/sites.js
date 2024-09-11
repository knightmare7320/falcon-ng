class Sites {
  static getPerf(db, params, result) {
    const sqlStr = 'CALL FalconCode.getSitesPerf(?, ?, ?, ?, ?, ?, ?)';
    const sqlParams = [ 
        params.groupType,
        params.groupId,
        params.filterString,
        params.orderBy,
        params.orderDir,
        params.pageNumber,
        params.pageSize,
    ];
    console.log(sqlStr);
    console.log(sqlParams);

    try {
      db.query(
        sqlStr,
        sqlParams,
        function(err, results) {
          if (err) {
            console.error(err);
            result(err, null);
            return;
          }
          try {
            result(null, {
              "type": results[0][0].groupType,
              "parentId": results[0][0].parentId,
              "parentName": results[0][0].parentName,
              "id": results[0][0].groupId,
              "name": results[0][0].groupName,
              "totalRowCount": results[0][0].totalRowCount,
              "rows": results[1].map(({siteId, cascadeCode, siteName, ...row}) => {return {id: siteId, name: cascadeCode, description: siteName, ...row}})
            });
          } catch(err) {
            console.log(results[0]);
            console.error(err);
            result(err, null);
            return;
          }
        }
      )
    } catch (err) {
      console.error(err)
      result(err, null);
      return;
    }
  }
}

module.exports = Sites;