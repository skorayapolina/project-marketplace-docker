import { observer } from "mobx-react";
import React, { Component } from "react";
import { observable } from "mobx";
import { getSellerOrders, getUserById } from "../../http/services";
import style from "./style.module.scss";
import {FormattedMessage} from "react-intl";
import {ISeller} from "../../stores/helpers/interfaces";

@observer
class GridRowShop extends Component<{ seller: ISeller }> {
  @observable orders;
  @observable owner;

  async componentDidMount() {
    const response = await getSellerOrders(this.props.seller._id);
    this.orders = response.data;

    const responseUser = await getUserById(this.props.seller.idUser);
    this.owner = responseUser.data.name;
  }

  render() {
    return (
      <div className={style.gridRow}>
        <div>{this.owner}</div>
        <div>
          {this.props.seller.name}
        </div>
        <div>
          {this.props.seller.description}
        </div>
        <div>
          <div>
            {
              this.orders?.map((order, index) => (
                <ul
                    className={style.orderList}
                    key={index}
                >
                  <li>
                      <FormattedMessage id="name"/>
                      {order.name}
                  </li>
                  <li>
                      <FormattedMessage id="price"/>
                      {order.price}
                  </li>
                  <li>
                      <FormattedMessage id="status"/>
                      {order.status}
                  </li>
                </ul>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default GridRowShop;
