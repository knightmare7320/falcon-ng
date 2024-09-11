class org_clusters {
   static get(db, params, result) {
      const sqlStr = 'CALL FalconCode.getOrgClusters(?)';
      const sqlParams = [
         params.l5MarketId
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
      const sqlStr = 'CALL FalconCode.getOrgClustersPerf(?, ?, ?, ?, ?, ?)';
      const sqlParams = [
         params.l5MarketId,
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
               "rows": results[1].map(({orgClusterId, orgClusterName, ...row}) => {return {id: orgClusterId, name: orgClusterName, ...row}})
            });
         }
      );   
   }
}

module.exports = org_clusters;