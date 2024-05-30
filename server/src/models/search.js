class Search {
  static get(db, params, result) {
    const sqlStr = 'CALL gui.get_quick_search(?,?,?)';
    const sqlParams = [
      params.search_string,
      params.page_number,
      params.page_size,
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
           "row_count": results[0][0].total_row_count,
           "rows": results[1],
        });
      }
    );      
  }
}

module.exports = Search;