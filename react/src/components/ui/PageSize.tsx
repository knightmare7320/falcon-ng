import { ChangeEventHandler } from "react";

export default function PageSize(
  { pageSize, 
    pageSizes, 
    handlePageSizeChange
  }: {
    pageSize: number, 
    pageSizes: Array<number>, 
    handlePageSizeChange: ChangeEventHandler
  }
) {
  return <>
    <label htmlFor="pageSize">
      Page Size: 
    </label>

    <select 
      id="pageSize"
      value={pageSize} 
      onChange={handlePageSizeChange}
    >
      {pageSizes.map(val => 
        <option 
          key={val} 
          value={val}
        >{val}</option>
      )}
    </select>
  </>;
}