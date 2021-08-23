import style from "./style.module.scss";
import React, { Component } from "react";
import { TiWarningOutline } from "react-icons/ti";
import { IconContext } from "react-icons";
import { observer } from "mobx-react";
import { FormattedMessage } from "react-intl";

@observer
class MessageError extends Component<{ message: string; show: boolean }> {
  render() {
    return (
      <div className={this.props.show ? `${style.messageError}` : `${style.messageErrorNone}`}>
        <div className={style.messageError__icon}>
          <IconContext.Provider value={{ className: `${style.warningIcon}` }}>
            <TiWarningOutline />
          </IconContext.Provider>
        </div>

        <div className={style.messageError__message}>
          <FormattedMessage id={this.props.message} />
        </div>
      </div>
    );
  }
}

export default MessageError;
