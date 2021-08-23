import React, { Component } from "react";
import style from "./style.module.scss";
import GoodsStore from "../../stores/GoodsStore";
import { observer } from "mobx-react";
import RootStore from "../../stores/RootStore";
import { NavLink } from "react-router-dom";
import Good from "../../components/Good/Good";
import { ROUTES } from "../../routes/routes";
import { FormattedMessage } from "react-intl";

@observer
class HomePage extends Component {
  store: GoodsStore = new GoodsStore();

  async componentDidMount() {
    await this.store.search();
  }

  render() {
    const { user } = RootStore;

    return (
      <>
        <div className={style.header}>
          <div className={style.pageDescription}>
            <FormattedMessage id="info" />
          </div>
          {!user.authenticated && <div className={style.links}>
            <div className={style.linksCircle}>
              <NavLink to={ROUTES.users.login} className={style.authLink}>
                <FormattedMessage id="signIn" />
              </NavLink>

              <NavLink to={ROUTES.users.registration} className={style.authLink}>
                <FormattedMessage id="register" />
              </NavLink>
            </div>
          </div>}
        </div>

        <div className={style.wrapper}>
          <div className={style.wrapper__title}>
            <FormattedMessage id="top3" />
          </div>
          <ul className={style.stage}>
            {this.store.goods &&
              this.store.goods.slice(0, 3).map((good) => (
                <li className={style.scene} key={good._id}>
                  <div
                    className={style.movie}
                  >
                    <div className={style.poster}>
                      <div className={style.poster__inner}>
                        <Good
                          good={good}
                          idSeller={good.idSeller}
                          shadow={false}
                        />
                      </div>
                    </div>

                    <div className={style.info}>
                      <NavLink to={ROUTES.goods.goods + good._id}>
                        <div className={style.info__inner}>
                          <p className={style.info__name}>{good.name}</p>
                          <p>{good.description}</p>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </>
    );
  }
}

export default HomePage;
