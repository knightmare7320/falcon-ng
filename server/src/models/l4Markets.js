class l4Markets {
   static get(db, params, result) {
      const sqlStr = 'CALL FalconCode.getL4Markets(?)';
      const sqlParams = [
         params.regionId
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
      const sqlStr = 'CALL FalconCode.getL4MarketsPerf(?, ?, ?, ?, ?, ?)';
      const sqlParams = [
         params.regionId,
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
              "id": results[0][0].groupId ,
              "name": results[0][0].groupName,
              "totalRowCount": results[0][0].totalRowCount,
              "rows": results[1].map(({l4MarketId, l4MarketName, ...row}) => {return {id: l4MarketId, name: l4MarketName, ...row}})
            });
         }
      );      
   }
}

module.exports = l4Markets;