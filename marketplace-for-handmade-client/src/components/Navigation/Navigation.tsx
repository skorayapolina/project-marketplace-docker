import style from "./style.module.scss";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { withRouter } from "react-router";
import logo from "../../static/icons/handmade.svg";
import RootStore from "../../stores/RootStore";
import { observer } from "mobx-react";
import { getRole, Roles } from "../../stores/helpers/roles";
import { FormattedMessage } from "react-intl";
import { FaSignOutAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Button from "../Button/Button";
import classNames from "classnames";
import { MdLanguage } from "react-icons/md";
import {action, observable} from "mobx";
import {FiMenu} from "react-icons/fi"

@observer
class Navigation extends Component<{history}> {
  @observable hideMenu = true;

  @action.bound
  toggleMenu() {
    this.hideMenu = !this.hideMenu;
  }

  async logOut(user) {
    await user.logOutUser();

    const {history} = this.props;
    history.push("/");
  }

  setLocale = (localization, lang) => () => {
    localStorage.setItem("locale", lang);
    localization.locale = lang;
  };

  render() {
    const { user } = RootStore;
    const { localization } = RootStore;
    const {history} = this.props;

    return (
      <>
        <div className={style.navigation__list}>
          <div className={style.navigation__links}>
            <div className={style.localeBtn}>
              {localization.locale === "en" ? (
                <Button
                  styleType="medium"
                  onClick={this.setLocale(localization, "ru")}
                >
                  <MdLanguage />
                  <p>ru</p>
                </Button>
              ) : (
                <Button
                  styleType="medium"
                  onClick={this.setLocale(localization, "en")}
                >
                  <MdLanguage />
                  <p>en</p>
                </Button>
              )}
            </div>

            <NavLink to={ROUTES.root} className={style.navigation__link}>
              <img src={logo} alt="logo" className={style.navigation__image} />
            </NavLink>

            <NavLink
              to={ROUTES.goods.goods}
              className={classNames(style.navigation__link, style.navigation__link_full, {
                [style.activeLink]:
                  history.location.pathname === ROUTES.goods.goods,
              })}
            >
              <FormattedMessage id="goods" />
            </NavLink>

            {
              user.authenticated && getRole(Roles.admin) &&
                <NavLink
                    to={ROUTES.admin}
                    className={classNames(style.navigation__link, style.navigation__link_full, {
                      [style.activeLink]:
                      history.location.pathname === ROUTES.admin,
                    })}
                >
                  Admin
                </NavLink>
            }

            <button onClick={this.toggleMenu} className={style.btnToggleMenu}>
              <FiMenu/>
            </button>
          </div>

          {user.authenticated ? (
            <div className={classNames(style.navigation__links, style.navigation__links_hide, {[style.hideMenu]: this.hideMenu})}>
              <div className={style.dropdown}>
                <div
                  className={classNames(style.dropbtn, {
                    [style.activeLink]:
                      history.location.pathname === ROUTES.sellers.sellers + user.seller?.id ||
                      history.location.pathname === ROUTES.sellers.sellers,
                  })}
                >
                  {
                    history.location.pathname === ROUTES.sellers.sellers ?
                        <FormattedMessage id="orders"/> :
                        <FormattedMessage id="myShop"/>
                  }
                </div>
                <div className={style.dropdownContent}>
                  {getRole(Roles.seller) && user.seller ? (
                    <>
                      <NavLink
                        to={ROUTES.sellers.sellers + user.seller.id}
                        className={style.navigation__link}
                      >
                        <FormattedMessage id="shopJ" />
                      </NavLink>

                      <NavLink
                        to={ROUTES.sellers.sellers}
                        className={style.navigation__link}
                      >
                        <FormattedMessage id="orders" />
                      </NavLink>
                    </>
                  ) : (
                    <NavLink
                      to={ROUTES.sellers.sellers}
                      className={style.navigation__link}
                    >
                      <FormattedMessage id="startSelling" />
                    </NavLink>
                  )}
                </div>
              </div>

              <NavLink
                to={ROUTES.users.users + user.id}
                className={style.navigation__link}
              >
                <div
                  className={classNames(style.basketButtons, {
                    [style.activeLink]:
                      history.location.pathname ===
                      ROUTES.users.users + user.id,
                  })}
                >
                  {user.goodsInBasket.length}
                  <FiShoppingCart />
                </div>
              </NavLink>

              <div className={style.navigation__userName}>{user.name}</div>

              <div className={style.navigation__link}>
                <Button
                  styleType="medium"
                  onClick={() => this.logOut(user)}
                >
                  <FaSignOutAlt />
                </Button>
              </div>
            </div>
          ) : (
              <NavLink
                to={ROUTES.users.login}
                className={classNames(style.navigation__link, style.navigation__link_full, {
                  [style.activeLink]:
                    history.location.pathname === ROUTES.users.login,
                })}
              >
                <FormattedMessage id="signIn" />
              </NavLink>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(Navigation);
