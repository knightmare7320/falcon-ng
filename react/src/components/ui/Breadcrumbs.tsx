import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs() {
  return <div className={styles.breadcrumbs}>
    <Link to="/browse"> <FontAwesomeIcon icon={faHome} /> </Link>
    &gt;
    <Link to="/browse/region/3"> Northeast </Link>
    &gt;
    <Link to="/browse/l4_market/17"> WILL </Link>
    &gt;
    <Link to="/browse/l5_market/36"> Chicago Core </Link>
    &gt;
    <Link to="/browse/cluster/198"> Kankakee </Link>
    &gt;
    CH73XC028
  </div>
}