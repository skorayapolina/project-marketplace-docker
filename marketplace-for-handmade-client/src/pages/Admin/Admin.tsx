import style from "./style.module.scss";
import { observer } from "mobx-react";
import React, { Component } from "react";
import GridRowShop from "./GridRowShop";
import GridRowUser from "./GridRowUser";
import GridRowGood from "./GridRowGood";
import { FormattedMessage } from "react-intl";
import AdminStore from "../../stores/AdminStore";

@observer
class Admin extends Component {
  store: AdminStore = new AdminStore();

  async componentDidMount() {
    await this.store.init();
  }

  render() {
    return (
      <>
        <div className={style.adminPage}>
          <div className={style.tableTitle}>
            <FormattedMessage id="users" />
          </div>
          <div className={style.gridContainer}>
            <div className={style.gridRow}>
              <div/>
              <div>
                <FormattedMessage id="name"/>
              </div>
              <div>
                <FormattedMessage id="email"/>
              </div>
              <div>
                <FormattedMessage id="roles"/>
              </div>
              <div>
                <FormattedMessage id="orders"/>
              </div>
            </div>
            {this.store.users.map((user) =>
                <GridRowUser
                    user={user}
                    key={user._id}
                    deleteUser={this.store.deleteUser}
                />)}
          </div>

          <div className={style.tableTitle}>
            <FormattedMessage id="goods" />
          </div>

          <div className={style.gridContainer}>
            <div className={style.gridRow}>
              <div>
                <FormattedMessage id="name"/>
              </div>
              <div>
                <FormattedMessage id="price"/>
              </div>
              <div>
                <FormattedMessage id="category"/>
              </div>
              <div>
                <FormattedMessage id="description"/>
              </div>
              <div>
                <FormattedMessage id="seller"/>
              </div>
            </div>
            {this.store.goods.map((good) =>
                <GridRowGood
                    good={good}
                    idSeller={good.idSeller}
                    key={good._id}
                />
            )}
          </div>


          <div className={style.tableTitle}>
            <FormattedMessage id="shops" />
          </div>

          <div className={style.gridContainer}>
            <div className={style.gridRow}>
              <div>
                <FormattedMessage id="owner"/>
              </div>
              <div>
                <FormattedMessage id="shopName"/>
              </div>
              <div>
                <FormattedMessage id="description"/>
              </div>
              <div>
                <FormattedMessage id="orders"/>
              </div>
            </div>
            {this.store.sellers.map((seller) =>
                <GridRowShop seller={seller} key={seller._id} />
            )}
          </div>

        </div>
      </>
    );
  }
}

export default Admin;
