import { observer } from "mobx-react";
import React, { Component } from "react";
import { IGood } from "../../stores/helpers/interfaces";
import GoodStore from "../../stores/GoodStore";
import { observable } from "mobx";
import style from "./style.module.scss";

@observer
class GridRowGood extends Component<{ good: IGood; idSeller: string }> {
  goodStore: GoodStore = new GoodStore();
  @observable sellerName = "";

  componentDidMount(): void {
    this.goodStore
      .getShopName(this.props.idSeller)
      .then((response) => (this.sellerName = response));
  }

  render() {
    const { good } = this.props;

    return (
      <div className={style.gridRow}>
        <div>{good.name}</div>
        <div>{good.price}</div>
        <div>{good.category}</div>
        <div>{good.description}</div>
        <div>{this.sellerName}</div>
      </div>
    );
  }
}

export default GridRowGood;
