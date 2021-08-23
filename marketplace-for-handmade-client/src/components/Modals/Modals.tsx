import React, { Component } from "react";
import { observer } from "mobx-react";

import "../Good/style.module.scss";
import ModalStore, {DialogActionType} from "../../stores/ModalStore";

@observer
class Modals extends Component {
  onClose = (dialogActionType = DialogActionType.close, data?: any) =>
    ModalStore.closeModal(dialogActionType, data);

  onCancel = () => ModalStore.closeModal(DialogActionType.cancel);

  onSubmit = (data?: any) =>
    ModalStore.closeModal(DialogActionType.submit, data);

  render() {
    return ModalStore.modalList.map((modal) => {
      const ModalComponent = modal.Component;

      return (
        <ModalComponent
          {...modal.props}
          onClose={this.onClose}
          onSubmit={this.onSubmit}
          onCancel={this.onCancel}
          key={modal.id}
        />
      );
    });
  }
}

export default Modals;
