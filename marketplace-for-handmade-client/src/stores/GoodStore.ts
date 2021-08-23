import { action, computed, observable } from "mobx";
import {
  deleteGoodFromLikedGoods,
  getGoodWithSellerById,
  getSellerById,
  postGoodIntoBasket,
  postGoodIntoLikedGoods,
  updateGood,
  updateLikes,
} from "../http/services";
import RootStore from "./RootStore";

const { user } = RootStore;

class GoodStore {
  @observable good = {
    _id: "",
    name: "",
    price: 0,
    category: "",
    idSeller: "",
    description: "",
    likes: 0,
    image: "",
    photos: [],
    seller: {
      _id: "",
      services: "",
      name: "",
      description: "",
      logo: "",
    },
  };

  @action.bound
  async initGood(id) {
    try {
      const responseGood = await getGoodWithSellerById(id);
      this.good = responseGood.data;
    } catch (error) {
    }
  }

  @action
  async getShopName(idSeller) {
    try {
      const responseSeller = await getSellerById(idSeller);
      return responseSeller.data.name;
    } catch (error) {
    }
  }

  @action.bound
  async update(payload) {
    try {
      const newGood = {
        name: payload.goodName,
        description: payload.description,
        price: payload.price,
        category: payload.goodCategory,
      };

      const responseGood = await updateGood(payload.id, newGood);
      this.good = responseGood.data;
    } catch (error) {
    }
  }

  @action.bound
  async addToBasket() {
    try {
      await postGoodIntoBasket(user.id, this.good._id);
      await user.initBasket();
    } catch (error) {
    }
  }

  @action.bound
  async toggleLikedGoods (isLike: boolean) {
    if (isLike) {
      try {
        this.good.likes = this.good.likes + 1;
        await updateLikes(this.good._id, this.good.likes);

        await postGoodIntoLikedGoods(user.id, this.good._id);
        await user.initLikedGoods();

        await user.getGoods();
      } catch (error) {
      }
    } else {
      try {
        const response = await deleteGoodFromLikedGoods(user.id, this.good._id);
        user.likes = response.data.likedGoods;
        user.goodsInLikedGoods = user.goodsInLikedGoods.filter (
            (good) => good._id !== this.good._id
        );

        this.good.likes = this.good.likes - 1;
        await updateLikes(this.good._id, this.good.likes);

        await user.getGoods();
      } catch (error) {
      }
    }
  }

  @computed
  get isInBasket() {
    return user.basket.includes(this.good._id);
  }

  @computed
  get isLiked() {
    return user.likes.includes(this.good._id);
  }
}

export default GoodStore;
