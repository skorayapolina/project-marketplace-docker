import { observer } from "mobx-react";
import React, { Component } from "react";
import style from "./style.module.scss";
import { FormattedMessage } from "react-intl";
import Button from "../../components/Button/Button";
import classNames from "classnames";
import {Roles} from "../../stores/helpers/roles";
import {IUser} from "../../stores/helpers/interfaces";

@observer
class GridRowUser extends Component<{
  user: IUser;
  deleteUser: (userId) => void;
}> {
  render() {
      return (
      <div className={style.gridRow}>
        <div>
          <Button
            className={classNames(style.buttonDeleteUser, style.button)}
            onClick={() => this.props.deleteUser(this.props.user._id)}
            disabled={this.props.user.roles.includes(Roles.admin)}
          >
            <FormattedMessage id={"deleteUser"} />
          </Button>
        </div>
        <div>{this.props.user.name}</div>
        <div>{this.props.user.email}</div>
        <div>
          {this.props.user.roles.join(", ")}
        </div>
        <div>
          <div>
            {
              this.props.user.orders?.map((order, index) => (
                <ul
                  className={style.orderList}
                  key={index}
                >
                  <li><FormattedMessage id="name"/> {order.name}</li>
                  <li><FormattedMessage id="price"/> {order.price}</li>
                  <li><FormattedMessage id="status"/> {order.status}</li>
                </ul>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default GridRowUser;
