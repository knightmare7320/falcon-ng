import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAngleLeft, faAngleRight, faAnglesRight } from '@fortawesome/free-solid-svg-icons'

import "./PageNumber.css"


export default function PageNumber(
  { pageNumber, 
    pageCount,
    onPageChange:gotoPage
  }: {
    pageNumber: number, 
    pageCount: number,
    onPageChange: Function,
  }
) {

  const FirstButton = () => <button disabled={pageNumber === 1} onClick={() => gotoPage(1)}>
    <FontAwesomeIcon icon={faAnglesLeft} />
  </button>;
  
  const BackButton = () => <button disabled={pageNumber === 1} onClick={() => gotoPage(pageNumber - 1)}>
    <FontAwesomeIcon icon={faAngleLeft} />
  </button>;
  
  const NextButton = () => <button disabled={pageNumber === pageCount} onClick={() => gotoPage(pageNumber + 1)}> 
    <FontAwesomeIcon icon={faAngleRight} />
  </button>;
  
  const LastButton = () => <button disabled={pageNumber === pageCount} onClick={() => gotoPage(pageCount)}>
    <FontAwesomeIcon icon={faAnglesRight} />
  </button>;

  const SpacerButton = () => <button disabled className="spacer">...</button>;

  function NumberButton({pageIdx}: {pageIdx:number}) {
    return <button
      disabled={pageIdx === pageNumber}
      onClick={() => gotoPage(pageIdx)}
      className={pageIdx === pageNumber ? 'selected' : undefined}
    >{pageIdx}</button>;
  }
  
  function NumberButtons() {
    let prevDots = false;
    return Array(pageCount).fill(1).map(
        (_, idx) => {
          const pageIdx = idx + 1;

          if ( (pageNumber < 3 && pageIdx <= 5) ||
               (pageNumber > pageCount - 3) && (pageIdx > pageCount - 5) ||
               (Math.abs(pageIdx - pageNumber) < 3)
          ) {

            prevDots = false;
            return <NumberButton key={pageIdx} pageIdx={pageIdx} />;

          } else {

            if (prevDots) {
              return;
            } else {
              prevDots = true;
              return <SpacerButton key={pageIdx} />;
            }

          }
        }
      );
  }

  /*------*/

  return <>
    <label>
      Page Number: 
    </label>

    <div className="pageControls__btn-group">
      <FirstButton />
      <BackButton />
      <NumberButtons />
      <NextButton />
      <LastButton />
    </div>
  </>;
}