class Sites {
  static getPerf(db, params, result) {
    const sqlStr = 'CALL gui.get_sites_perf(?, ?, ?, ?, ?, ?, ?)';
    const sqlParams = [ 
        params.group_type,
        params.group_id,
        params.filter_string,
        params.order_by,
        params.order_dir,
        params.page_number,
        params.page_size,
    ];
    console.log(sqlStr);
    console.log(sqlParams);
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
          "type": results[0][0].group_type,
          "parent_id": results[0][0].parent_id,
          "parent_name": results[0][0].parent_name,
          "id": results[0][0].group_id,
          "name": results[0][0].group_name,
          "row_count": results[0][0].total_row_count,
          "rows": results[1].map(({site_id, cascade_code, site_name, ...row}) => {return {id: site_id, name: cascade_code, description: site_name, ...row}})
        });
      }
    );              
  }
}

module.exports = Sites;