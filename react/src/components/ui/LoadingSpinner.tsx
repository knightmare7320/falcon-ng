import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnerContainer}>
      {Array(5).fill(1).map(() => 
        <div className={styles.spinnerItem} />
      )}
    </div>
  )
}