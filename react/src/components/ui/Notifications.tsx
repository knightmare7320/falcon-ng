import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug, faExclamationTriangle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

import { RootState } from "../../store";
import { MessageType } from "../../util/ui.model";
import { uiActions } from '../../store/ui.slice';


import styles from "./Notifications.module.css";

export default function Notifications() {
  const messages = useSelector((state: RootState) => state.ui.messages);
  const dispatch = useDispatch();

  function handleDeleteMessage(index:number) {
    dispatch(uiActions.deleteMessage(index));
    return;
  }

  if (messages.length < 1) {
    return <></>;

    
  }
  return <>
    {messages.map((message:MessageType, index:number) => 
      <div key={index} className={styles.error}>
        <span className={styles.icon}>
          {
            message.type === 'error' ? 
              <FontAwesomeIcon icon={faBug} /> : 
              <FontAwesomeIcon icon={faExclamationTriangle} />
          }
        </span>
        <span className={styles.timestamp}>{message.timestamp}</span>
        <span className={styles.message}>{message.message}</span>
        <span className={styles.closeButton}>
          <button onClick={() => handleDeleteMessage(index)}>
            <FontAwesomeIcon icon={faXmarkCircle} />
          </button>
        </span>
      </div>
    )}
  </>;
}