import { ChangeEvent } from "react";

export default function PageSize(
  { pageSize, 
    pageSizes, 
    onPageSizeChange
  }: {
    pageSize:number, 
    pageSizes:Array<number>, 
    onPageSizeChange:Function,
  }
) {

  function handlePageChange(newPageSize:number) {
    onPageSizeChange(newPageSize);
  }

  return <>
    <label htmlFor="pageSize">
      Page Size: 
    </label>

      {pageSizes.map(val => 
        <button
          key={val} 
          disabled={val === pageSize}
          onClick={() => handlePageChange(val)}
        >{val}</button>
      )}
  </>;
}