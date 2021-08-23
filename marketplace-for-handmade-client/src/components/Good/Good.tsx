import style from "./style.module.scss";
import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react";
import {action, observable} from "mobx";
import {ROUTES} from "../../routes/routes";
import {IGood} from "../../stores/helpers/interfaces";
import GoodStore from "../../stores/GoodStore";
import {FormattedMessage} from "react-intl";
import {FaPen, FaTrash} from "react-icons/fa";
import {MdAttachMoney} from "react-icons/md";
import RootStore from "../../stores/RootStore";
import Button from "../Button/Button";
import classNames from "classnames";
import ModalStore from "../../stores/ModalStore";
import UpdateGoodModal from "./UpdateGoodModal";
import {IconContext} from "react-icons";
import {GoodsContainerType} from "../GoodsContainer/GoodsContainer";

interface Props {
  good: IGood;
  idSeller: string;
  goodsContainerType?: GoodsContainerType;
  shadow?: boolean;
  updateGood?: (id: string) => void;
}

@observer
class Good extends Component<Props> {
  store = new GoodStore();

  @observable sellerName = "";

  componentDidMount(): void {
    this.store
      .getShopName(this.props.idSeller)
      .then((response) => (this.sellerName = response));
  }

  @action
  deleteGood = (user, id) => async () => {
    await user.removeFromBasket(id);
  };

  openModal = (good?, updateGood?) => async () => {
    const { payload } = await ModalStore.showModal(UpdateGoodModal, { good });

    await this.store.update(payload);
    await updateGood(good.idSeller);
  };

  render() {
    const { user } = RootStore;
    const { good, shadow, goodsContainerType, idSeller, updateGood } = this.props;

    return (
      <div
        className={style.good}
        id={good._id + good.idOrder}
        style={shadow === false ? { boxShadow: "none" } : {}}
      >
        <div className={style.good__buttons}>
          {good.idSeller === user.seller?.id &&
          goodsContainerType === GoodsContainerType.sellerPage && (
              <>
                <Button
                  styleType="small"
                  id={good._id}
                  className={style.updateGoodButton}
                  onClick={this.openModal(good, updateGood)}
                >
                  <FaPen />
                </Button>
              </>
            )}
          {goodsContainerType === GoodsContainerType.basket && (
            <>
              <div className={style.tooltip}>
                <Button
                    styleType="small"
                    id={good.name + "-addOrder"}
                    className="addOrderButton"
                    onClick={() => user.addOrder(user.id, good._id, idSeller)}
                >
                  <IconContext.Provider value={{ className: style.moneyIcon }}>
                    <MdAttachMoney />
                  </IconContext.Provider>
                </Button>
                <span className={style.tooltiptext}>
                  <FormattedMessage id="pay"/>
                </span>
              </div>

              <Button
                  styleType="small"
                  id={good.name + "-remove"}
                  className="removeButton"
                  onClick={this.deleteGood(user, good._id)}
              >
                <FaTrash />
              </Button>
            </>
          )}
        </div>

        <div className={style.good__image}>
          <NavLink
            className={style.good__linkImage}
            to={ROUTES.goods.goods + good._id}
          >
            <img src={good.image} alt="good" />
          </NavLink>
        </div>

        <div className={style.good__about}>
          <NavLink
            to={ROUTES.goods.goods + good._id}
            className={classNames(style.good__title, style.good__link)}
          >
            {good.name}
          </NavLink>

          <div className={style.good__info}>
            <NavLink
              to={ROUTES.sellers.sellers + idSeller}
              className={classNames(style.good__link)}
            >
              {this.sellerName}
            </NavLink>

            <div className={style.good__price}>{good.price}$</div>
          </div>

          <div className={style.good__likes}>
            <div>
              <FormattedMessage id="likes" values={{ likes: good.likes }} />
            </div>
          </div>
        </div>

        {
          this.props.goodsContainerType === GoodsContainerType.goods &&

            <div className={style.overlay}>
              <div className={style.overlay__text}>
                <NavLink
                    className={style.good__linkImage}
                    to={ROUTES.sellers.sellers + idSeller}
                >
                  <p className={style.overlay__shopName}>
                    {this.sellerName}
                  </p>
                </NavLink>

                <NavLink
                    className={style.good__linkImage}
                    to={ROUTES.goods.goods + good._id}
                >
                  <p>
                    {this.props.good.description?.slice(0, 80)}...
                  </p>

                  <p className={style.overlay__message}>
                    <FormattedMessage id="seeMore"/>
                  </p>
                </NavLink>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default Good;
