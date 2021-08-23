import style from "./style.module.scss";
import "./GoodsContainerAnimation.scss";
import React, { Component } from "react";
import Good from "../Good/Good";
import { observer } from "mobx-react";
import { IGood } from "../../stores/helpers/interfaces";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { observable } from "mobx";
import classNames from "classnames";

export enum GoodsContainerType {
  goods = "GOODS",
  basket = "BASKET",
  sellerPage = "SELLER_PAGE",
  likedGoods = "LIKED_GOODS"
}

interface Props {
  title?: any;
  goods: IGood[];
  goodsContainerType?: GoodsContainerType;
  updateGood?: (id: string) => void;
}

@observer
class GoodsContainer extends Component<Props> {
  @observable animate = true;

  render() {
    const {
      goods,
      goodsContainerType,
      title,
      ...rest
    } = this.props;

    return (
      <div
        className={classNames(style.goodsContainer, {
          [style.goodsContainer__padding]: !title,
        })}
      >
        {title && (
          <div className={style.goodsContainer__title}>
            {title}
          </div>
        )}

        <div className={style.goodsContainer__grid}>
          <TransitionGroup component={null}>
            {goods.map((good) => (
              <CSSTransition
                in={this.animate}
                appear={true}
                key={good._id + "anim"}
                timeout={200}
                classNames="fade"
              >
                <Good
                  key={good._id + good.idOrder}
                  good={good}
                  idSeller={good.idSeller}
                  goodsContainerType={goodsContainerType}
                  {...rest}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export { GoodsContainer };
