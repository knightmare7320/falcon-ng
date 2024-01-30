import { ReactNode } from "react";

import classes from "./Content.module.css";


export default function Content({children}: {children: ReactNode}) {
  return <>
    <div className={classes.pageContent}>
      { children }
    </div>
  </>;
}