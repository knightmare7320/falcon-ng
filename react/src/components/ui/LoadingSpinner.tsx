import { useState, useEffect } from "react";

import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  const [ show, setShow ] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  })

  if (!show) {
    return <></>;
  }

  return (
    <div className={styles.disableParent}>
      <div className={styles.spinnerContainer}>
        {Array(5).fill(1).map((_,idx) => 
          <div key={idx} className={styles.spinnerItem} />
        )}
      </div>
    </div>
  )
}