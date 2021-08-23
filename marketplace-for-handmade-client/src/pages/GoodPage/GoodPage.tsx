import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import style from "./style.module.scss";
import GoodStore from "../../stores/GoodStore";
import { observer } from "mobx-react";
import { FaHeart } from "react-icons/fa";
import { FormattedMessage } from "react-intl";
import RootStore from "../../stores/RootStore";
import Button from "../../components/Button/Button";
import classNames from "classnames";
import {action, observable} from "mobx";
import { getGoodsOfSeller } from "../../http/services";
import { IGood } from "../../stores/helpers/interfaces";
import { ROUTES } from "../../routes/routes";

@observer
class GoodPage extends Component<{match}> {
  store = new GoodStore();
  @observable sellerGoods: IGood[] = [];

  async componentDidMount() {
    const { match } = this.props;
    await this.store.initGood(match.params.id);

    try {
      const response = await getGoodsOfSeller(this.store.good.seller._id);
      this.sellerGoods = response.data;
    } catch (error) {
    }

    const page = document.querySelector("#page");
    page?.scrollIntoView();
  }

  @action
  like = (isLike) => async () => {
    await this.store.toggleLikedGoods(isLike);
  };

  render() {
    const { user } = RootStore;
    const isOwner = user.seller && Boolean(user.goodsOfSeller.filter((good) => this.store.good._id === good._id).length);

    return (
      <>
        <div className={style.goodPage} id="page">
          <div
            className={classNames(
              style.goodPage__section,
              style.goodPage__sectionGood
            )}
          >
            <div className={style.content}>
              <div className={style.image__div}>
                <img
                  className={style.goodPage__image}
                  src={this.store.good.image}
                  alt="good"
                />

                <div className={style.buttonLike__div}>
                  {this.store.isLiked ? (
                    <Button
                      styleType="small"
                      className={classNames(
                        style.buttonLike,
                        style.buttonLike_liked
                      )}
                      onClick={this.like(false)}
                    >
                      <FaHeart />
                    </Button>
                  ) : (
                    <Button
                      styleType="small"
                      className={classNames(
                        style.buttonLike,
                        style.buttonLike_unliked
                      )}
                      onClick={this.like(true)}
                    >
                      <FaHeart />
                    </Button>
                  )}
                </div>
              </div>

              <div className={style.goodOptions}>
                <div className={style.goodOptions__name}>
                  {this.store.good.name}
                </div>

                <div className={style.goodPage__price}>
                  <div>
                    <FormattedMessage
                      id="price"
                      values={{ price: this.store.good.price }}
                    />
                  </div>
                  <div className={style.priceNumber}>
                    {this.store.good.price}$
                  </div>
                </div>

                <div className={style.goodPage__buttons}>
                  {this.store.isInBasket ? (
                    <Button
                      className={style.buttonAddToBasket}
                      onClick={() => user.removeFromBasket(this.store.good._id)}
                    >
                      <FormattedMessage id="removeFromBasket"/>
                    </Button>
                  ) : (
                    <Button
                      className={style.buttonAddToBasket}
                      onClick={this.store.addToBasket}
                      disabled={isOwner}
                    >
                      <FormattedMessage id="addToBasket"/>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className={classNames(
              style.goodPage__section,
              style.goodPage__sectionDescription
            )}
          >
            <div className={style.goodPage__descriptionTitle}>
              <FormattedMessage id="description" />
            </div>

            <div className={style.goodPage__descriptionText}>
              {this.store.good.description}
            </div>

            {Boolean(this.store.good.photos.length) && (
              <div className={style.itemsRow}>
                {
                  this.store.good.photos.map(photo =>
                      <div className={style.item} key={photo + Math.random()}>
                        <img src={photo} alt="additional" />
                      </div>
                  )
                }
              </div>
            )}
          </div>

          <div
            className={classNames(
              style.goodPage__section,
              style.goodPage__sectionShop
            )}
          >
            <div className={style.shopName}>
              <NavLink
                to={ROUTES.sellers.sellers + this.store.good.idSeller}
                className={style.shopLink}
              >
                <FormattedMessage
                  id="shop"
                  values={{ shopName: this.store.good.seller.name }}
                />
              </NavLink>
            </div>

            <div className={style.shopDescription}>
              {this.store.good.seller.description}
            </div>

            <div className={style.sellerGoods}>
              {Boolean(this.sellerGoods.length) &&
                this.sellerGoods.slice(0, 4).map((good) => (
                  <div
                    key={good._id}
                    className={style.sellerGoods__good}
                  >
                    <NavLink to={ROUTES.goods.goods + good._id}>
                      <img
                        className={style.sellerGoods__image}
                        src={good.image}
                        alt="good"
                      />
                    </NavLink>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default GoodPage;
