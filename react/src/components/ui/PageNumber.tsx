import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons'

import "./PageNumber.css"

export default function PageNumber(
  { pageNumber, 
    pageCount,
    onPageChange
  }: {
    pageNumber: number, 
    pageCount: number,
    onPageChange: Function,
  }
) {

  function handlePageChange(newPageNumber:number) {
    onPageChange(newPageNumber);
  }

  let prevDots = false;
  return <>
    <label>
      Page Number: 
    </label>

    <div className="pageControls__btn-group">
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

      {Array(pageCount).fill(1).map(
        (_, idx) => {
          if (Math.abs(idx + 1 - pageNumber) > 1) {
            if (prevDots) {
              return;
            } else {
              prevDots = true;
              return <button key={idx} disabled>...</button>
            }
          } else {
            prevDots = false;
            return <button
              key={idx} 
              disabled={idx + 1 === pageNumber}
              onClick={() => handlePageChange(idx + 1)}
              className={idx + 1 === pageNumber ? 'selected' : undefined}
            >
              {idx + 1}
            </button>;
          }
        }
        )
      }

      <button 
        disabled={pageNumber === pageCount}
        onClick={() => handlePageChange(pageNumber + 1)}
      > 
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button 
        disabled={pageNumber === pageCount}
        onClick={() => handlePageChange(pageCount)}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  </>;
}