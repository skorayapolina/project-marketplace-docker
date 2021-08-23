import style from "./style.module.scss";
import React, { Component } from "react";
import { observer } from "mobx-react";
import { IGood } from "../../stores/helpers/interfaces";
import Order from "../Order/Order";
import { FormattedMessage } from "react-intl";

export enum OrdersContainerType {
  ordersBuyer = "ORDERS_BUYER",
  ordersSeller = "ORDERS_SELLER",
}

interface Props {
  goods: IGood[];
  type?: OrdersContainerType;
  title?: string;
  accepted?: boolean
}

@observer
class OrdersContainer extends Component<Props> {
  render() {
    const { goods, type, title } = this.props;
    const {...rest} = this.props;

    return (
      <div className={style.ordersContainer}>
        <div className={style.ordersContainer__title}>
          {title ? (
            <FormattedMessage id={title} />
          ) : (
            <FormattedMessage id="orders" />
          )}
        </div>

        <div className={style.ordersContainer__grid}>
          {goods.map((good) => (
            <Order
              key={good._id + good.idOrder}
              good={good}
              idSeller={good.idSeller}
              type={type}
              {...rest}
            />
          ))}
        </div>
      </div>
    );
  }
}

export { OrdersContainer };
