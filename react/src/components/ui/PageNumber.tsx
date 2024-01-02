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
  if (rowCount <= pageSize) {
    return <></>;
  }

  let numPages = Math.ceil(rowCount / pageSize);

  return <>
    <label htmlFor="pageNumber">
      Page Number: 
    </label>

    <select 
      value={pageNumber} 
      onChange={handlePageChange}
      id="pageNumber"
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