import "./PageNumber.css";

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
    <label>
      Page Size: 
    </label>

    <div className="pageControls__btn-group">
      {pageSizes.map(val => 
        <button
        key={val} 
        disabled={val === pageSize}
        onClick={() => handlePageChange(val)}
        className={val === pageSize ? 'selected' : undefined}
        >{val}</button>
      )}
    </div>
  </>;
}