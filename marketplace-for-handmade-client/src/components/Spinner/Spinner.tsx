import React from "react";
import classNames from "classnames";
import style from "./style.module.scss";

const Spinner = (props) => (
  <div className={classNames(style.container, {[style.inComponent]: props.inComponent})}>
    <div className={style.spinner}>
      <div className={style.circle}>
        <span className={style.line}/>
        <span className={style.line}/>
        <span className={style.line}/>
        <span className={style.line}/>
      </div>
    </div>
  </div>
);

export default Spinner;
