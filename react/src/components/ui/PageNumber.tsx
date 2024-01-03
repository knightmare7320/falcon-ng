import { ChangeEventHandler } from "react";

export default function PageNumber(
  { rowCount, 
    pageNumber, 
    pageSize, 
    handlePageChange
  }: {
    rowCount: number, 
    pageNumber: number, 
    pageSize: number, 
    handlePageChange: ChangeEventHandler
  }
) {
  let numPages = Math.ceil(rowCount / pageSize) || 1;

  return <>
    <label htmlFor="pageNumber">
      Page Number: 
    </label>

    <select 
      value={pageNumber} 
      onChange={handlePageChange}
      id="pageNumber"
      disabled={rowCount <= pageSize}
    >
      {Array(numPages).fill(1).map((_, idx) => 
        <option 
          key={idx} 
          value={idx + 1}
        >{idx + 1}</option>
      )}
    </select>
  </>;
}