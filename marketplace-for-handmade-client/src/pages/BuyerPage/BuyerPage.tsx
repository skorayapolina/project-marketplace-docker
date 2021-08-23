import styles from "./style.module.scss";
import React, { Component } from "react";
import {GoodsContainer, GoodsContainerType} from "../../components/GoodsContainer/GoodsContainer";
import { observer } from "mobx-react";
import RootStore from "../../stores/RootStore";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import basket from "../../static/icons/shopping-cart.svg";
import { ROUTES } from "../../routes/routes";
import {
  OrdersContainer, OrdersContainerType,
} from "../../components/OrdersContainer/OrdersContainer";

@observer
class BuyerPage extends Component {
  render() {
    const { user } = RootStore;
    const basketMessage = <FormattedMessage id="basket" />;
    const likedMessage = <FormattedMessage id="liked" />;

    return (
      <div className={styles.profileContainer}>
        <div className={styles.profileContainer__aside}>
          <div className={styles.menu}>
            <a className={styles.profileContainer__link} href="#basket">
              <FormattedMessage id="basket" />
            </a>
            <a className={styles.profileContainer__link} href="#liked">
              <FormattedMessage id="liked" />
            </a>
            <a className={styles.profileContainer__link} href="#orders">
              <FormattedMessage id="orders" />
            </a>
          </div>
        </div>

        <div className={styles.profileContainer__main}>
          <div>
            <div className={styles.basketContainer} id="basket">
              {user.goodsInBasket.length !== 0 ? (
                <>
                  <GoodsContainer
                    title={basketMessage}
                    goods={user.goodsInBasket}
                    goodsContainerType={GoodsContainerType.basket}
                  />

                  <div className={styles.basketContainer__cost}>
                    <FormattedMessage
                      id="basketCost"
                      values={{ basketCost: user.basketCost }}
                    />
                  </div>
                </>
              ) : (
                <div className={styles.emptyContainer}>
                  <div className={styles.emptyMessage}>
                    <FormattedMessage id="emptyBasket" />
                  </div>

                  <NavLink to={ROUTES.goods.goods} className="">
                    <img
                      className={styles.imgShoppingCart}
                      src={basket}
                      alt="shopping-cart"
                    />
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          <div>
            <div id="liked">
              {Boolean(user.goodsInLikedGoods.length) && (
                <GoodsContainer
                  title={likedMessage}
                  goods={user.goodsInLikedGoods}
                  goodsContainerType={GoodsContainerType.likedGoods}
                />
              )}
            </div>
          </div>

          <div>
            <div id="orders">
              {Boolean(user.orders.length) && (
                <OrdersContainer
                  goods={user.orders}
                  type={OrdersContainerType.ordersBuyer}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(BuyerPage);
