import style from "./style.module.scss";
import React, { Component } from "react";
import { getRole, Roles } from "../../stores/helpers/roles";
import RootStore from "../../stores/RootStore";
import { observer } from "mobx-react";
import {
  OrdersContainer, OrdersContainerType
} from "../../components/OrdersContainer/OrdersContainer";
import Button from "../../components/Button/Button";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";
import styles from "../BuyerPage/style.module.scss";
import fileIcon from "../../static/icons/empty.svg";

@observer
class SellerProfile extends Component {
  render() {
    const { user } = RootStore;
    const processingOrders = user.ordersOfSeller.filter((good) => good.status === "processing");
    const acceptedOrders = user.ordersOfSeller.filter((good) => good.status === "accepted");

    return (
      <div className={style.profileContainer}>
        {getRole(Roles.seller) ? (
          <>
            <div className={style.shopName}>
              <FormattedMessage
                id="shop"
                values={{ shopName: user.seller?.name }}
              />
            </div>
            {user.ordersOfSeller.length === 0 && (
              <div className={style.profileContainer__message}>
                <div className={style.profileContainer__messageText}>
                  <FormattedMessage id="noOrders"/>
                </div>

                <div className={style.profileContainer__messageIcon}>
                  <img
                    className={styles.imgShoppingCart}
                    src={fileIcon}
                    alt="shopping-cart"
                  />
                </div>
              </div>
            )}
            {Boolean(processingOrders.length) && (
              <OrdersContainer
                title="processingOrders"
                goods={processingOrders}
                type={OrdersContainerType.ordersSeller}
              />
            )}
            {Boolean(acceptedOrders.length) && (
              <OrdersContainer
                title="acceptedOrders"
                goods={acceptedOrders}
                type={OrdersContainerType.ordersSeller}
                accepted
              />
            )}
          </>
        ) : (
          <div className={style.profileContainer__form}>
            <div className={style.profileContainer__formTitle}>
              <FormattedMessage id="shopInfo" />
            </div>
            <input
              className={classNames(style.input, style.profileContainer__input)}
              type="text"
              name="newShopName"
              onChange={user.handleInputChange}
              placeholder="shop name"
              autoFocus
            />

            <textarea
              className={classNames(
                style.input,
                style.profileContainer__textarea,
                style.profileContainer__input
              )}
              name="newShopDescription"
              onChange={user.handleInputChange}
              placeholder="shop description"
            />

            <div className={style.fileInputs}>
              <p className={style.fileInputs__text}>
                <FormattedMessage id="addLogo"/>
              </p>
              <input
                  id="photos"
                  type="file"
                  name="files"
                  onChange={user.onInputFileChange}
                  className={style.inputLogo}
              />
              <label htmlFor="photos" className={style.labelLogo}>
                <FormattedMessage id="chooseFile" />
              </label>
              <div className={style.logoContainer}>
                {Boolean(user.logoURL) && (
                    <div className={style.logo}>
                      <img
                          src={user.logoURL}
                          alt="logo"
                          className={style.formLogo}
                      />
                    </div>
                )}
              </div>
            </div>

            <Button onClick={user.setSellerRole} disabled={!user.newShopName || !user.newShopDescription || !user.logoURL}>
              <FormattedMessage id="startSelling"/>
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default SellerProfile;
