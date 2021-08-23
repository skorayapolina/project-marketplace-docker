import style from "./style.module.scss";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react";
import RootStore from "../../stores/RootStore";
import GoodStore from "../../stores/GoodStore";
import { observable } from "mobx";
import { FaRegSquare } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { ROUTES } from "../../routes/routes";
import { IGood } from "../../stores/helpers/interfaces";
import Button from "../Button/Button";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import { IconContext } from "react-icons";
import {OrdersContainerType} from "../OrdersContainer/OrdersContainer";

interface Props {
  good: IGood;
  idSeller: string;
  type?: OrdersContainerType;
  accepted?: boolean
}

@observer
class Order extends Component<Props> {
  store = new GoodStore();
  @observable sellerName = "";

  componentDidMount(): void {
    this.store
      .getShopName(this.props.idSeller)
      .then((response) => (this.sellerName = response));
  }

  doneOrder = (orderId) => async () => {
    await RootStore.user.deleteOrder(orderId);
  };

  accept = (orderId) => async () => {
    await RootStore.user.acceptOrder(orderId);
  };

  render() {
    const { idSeller, good, type, accepted } = this.props;

    return (
      <div className={classNames(style.order, {[style.order_dark]: accepted} )} id={good._id + good.idOrder}>
        <div className={style.order__image}>
          <img src={good.image} alt="order" />
        </div>

        <div className={style.order__about}>
          <NavLink
            to={ROUTES.goods.goods + good._id}
            className={classNames(style.order__title, style.order__link)}
          >
            {good.name}
          </NavLink>

          <div className={style.order__info}>
            <NavLink
              to={ROUTES.sellers.sellers + idSeller}
              className={style.order__link}
            >
              {this.sellerName}
            </NavLink>

            <div className={style.orderPrice}>{good.price}$</div>

            <div className="order__buttons">
              <div>
                <FormattedMessage id="status" />: {good.status}
              </div>
              {good.status === "accepted" &&
              type === OrdersContainerType.ordersBuyer && (
                  <div className={style.order__buttonDone}>
                    <div>
                      <FormattedMessage id="doneOrder" />:
                    </div>
                    <Button
                      styleType="small"
                      className={style.order__statusButton}
                      onClick={this.doneOrder(good.idOrder)}
                    >
                      <IconContext.Provider
                        value={{ className: style.doneIcon }}
                      >
                        <MdDone />
                      </IconContext.Provider>
                    </Button>
                  </div>
                )}
              {good.status === "processing" &&
               type === OrdersContainerType.ordersSeller && (
                  <div className={style.order__status}>
                    <div>
                      <FormattedMessage id="acceptOrder" />:
                    </div>

                    <Button
                      styleType="small"
                      className={style.order__statusButton}
                      onClick={this.accept(good.idOrder)}
                    >
                      <IconContext.Provider
                        value={{ className: style.acceptIcon }}
                      >
                        <FaRegSquare />
                      </IconContext.Provider>
                    </Button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Order;
