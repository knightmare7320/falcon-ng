import { ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons'

export default function PageNumber(
  { rowCount, 
    pageNumber, 
    pageSize, 
    onPageChange
  }: {
    rowCount: number, 
    pageNumber: number, 
    pageSize: number, 
    onPageChange: Function,
  }
) {
  let numPages = Math.ceil(rowCount / pageSize) || 1;

  function handlePageChange(newPageNumber:number) {
    onPageChange(newPageNumber);
  }

  return <>
    <label htmlFor="pageNumber">
      Page Number: 
    </label>

    <button 
      disabled={pageNumber === 1}
      onClick={() => handlePageChange(1)}
    >
      <FontAwesomeIcon icon={faAnglesLeft} />
    </button>
    <button 
      disabled={pageNumber === 1}
      onClick={() => handlePageChange(pageNumber - 1)}
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>

    {Array(numPages).fill(1).map((_, idx) => 
      <button type="button"
        key={idx} 
        disabled={idx + 1 === pageNumber}
        onClick={() => handlePageChange(idx + 1)}
      >{idx + 1}</button>
    )}

    <button 
      disabled={pageNumber === numPages}
      onClick={() => handlePageChange(pageNumber + 1)}
    > 
      <FontAwesomeIcon icon={faAngleRight} />
    </button>
    <button 
      disabled={pageNumber === numPages}
      onClick={() => handlePageChange(numPages)}
    >
      <FontAwesomeIcon icon={faAnglesRight} />
    </button>

  </>;
}