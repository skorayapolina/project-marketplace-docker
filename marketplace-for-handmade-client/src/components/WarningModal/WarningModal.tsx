import React, { Component } from "react";
import { observer } from "mobx-react";
import Modal from "rc-dialog";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import style from "./style.module.scss";
import { DialogActionType, ModalProps } from "../../stores/ModalStore";
import Button from "../Button/Button";

interface Props extends ModalProps {
  title?: string;
  description?: string;
  cancel?: string;
  submit?: string;
  className?: string;
  type?: string;
}

@observer
class WarningModal extends Component<Props> {
  onSubmit = () => {
    this.props.onClose(DialogActionType.submit);
  };

  onClose = () => {
    this.props.onClose(DialogActionType.close);
  };

  render() {
    const {
      title,
      description,
      cancel = "NO",
      submit = "YES",
      className,
      ...props
    } = this.props;

    return (
      <Modal
        {...props}
        onClose={this.onClose}
        className={classNames(style.modal, className)}
        destroyOnClose={true}
        closable={false}
        zIndex={999}
        maskStyle={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",
          backgroundColor: "#00000091",
        }}
        visible
      >
        {title && (
          <div className={style.title}>
            <FormattedMessage id={title} />
          </div>
        )}

        {description && (
          <p className={style.description}>
            <FormattedMessage id={description} />
          </p>
        )}

        <div className={style.buttons}>
          <Button className={style.btn} onClick={this.onClose}>
            <FormattedMessage id={cancel} />
          </Button>

          <Button className={style.btn} onClick={this.onSubmit}>
            <FormattedMessage id={submit} />
          </Button>
        </div>
      </Modal>
    );
  }
}

export default WarningModal;
