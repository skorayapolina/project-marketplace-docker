import React from "react";
import style from "./style.module.scss";
import icon from "../../static/icons/page-not-found.svg";

function NoMatch() {
  return (
    <div className={style.page}>
      <div className={style.page__iconWrapper}>
        <img src={icon} alt="404" />
      </div>
    </div>
  );
}

export default NoMatch;
