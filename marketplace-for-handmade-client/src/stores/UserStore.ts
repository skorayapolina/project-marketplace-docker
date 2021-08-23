import {action, computed, observable} from "mobx";
import {instance} from "../http/instance";
import {URLS} from "../http/urls";
import {
  deleteGoodFromBasket,
  deleteOrders,
  getGoodsInBasket,
  getGoodsOfSeller,
  getLikedGoods,
  getSellerOrders,
  getShopByUserId,
  getUserById,
  getUserOrders,
  postGood,
  postOrder,
  postShop,
  updateOrderState,
  updateUserRole,
  uploadImages,
} from "../http/services";
import jwtDecode from "jwt-decode";
import {IGood, ISeller} from "./helpers/interfaces";
import {Roles} from "./helpers/roles";

const TOKEN = "token";

class Seller {
  @observable id: string;
  @observable description: string;
  @observable name: string;
  @observable services: string[];
  @observable logo: string;
  @observable idUser: string;

  constructor(data: ISeller) {
    this.id = data._id;
    this.description = data.description;
    this.name = data.name;
    this.services = data.services;
    this.logo = data.logo;
    this.idUser = data.idUser;
  }
}

class UserStore {
  @observable id;
  @observable name = "";
  @observable email = "";
  @observable password = "";
  @observable roles: Roles[] = [];
  @observable basket = [];
  @observable likes = [];
  @observable orders: IGood[] = [];

  @observable goodsInBasket: IGood[] = [];
  @observable goodsInLikedGoods: IGood[] = [];

  @observable showMessageError = false;
  @observable isRegistrError = false;
  @observable isError = false;

  errors = {
    notCreated: [],
  };

  @observable seller: Seller | null;
  @observable goodsOfSeller: IGood[] = [];
  @observable ordersOfSeller: IGood[] = [];

  @observable newShopName = "";
  @observable newShopDescription = "";

  @observable logoURL = "";
  @observable files = [];

  constructor() {
    const accessToken = this.getAuthTokens();

    if (accessToken) {
      this.init(accessToken);
    }
  }

  @action
  async init(token: string) {
    const authData = jwtDecode(token);

    this.id = authData.id;
    this.name = authData.name;
    this.roles = authData.roles;

    try {
      await Promise.all([
        this.initBasket(),
        this.initLikedGoods(),
        this.getOrders(this.id)
      ]);

      if (this.roles.includes(Roles.seller)) {
        await this.initSeller(this.id);
        await this.initGoodsOfSeller(this.seller?.id);
      }
    } catch (e) {

    }
  }

  getAuthTokens = () => {
    return localStorage.getItem(TOKEN);
  };

  @computed
  get authenticated() {
    return Boolean(this.name);
  }

  @action.bound
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this[name] = value;
  }

  @action.bound
  onInputFileChange(event) {
      const target = event.target;

      const files = target.files;
      const name = target.name;

      this[name] = files;

      this.logoURL = window.URL.createObjectURL(this.files[0]);
  }

  @action.bound
  async login(email, password) {
    const user = {
      email: email,
      password: password,
    };

    try {
      this.showMessageError = false;
      const response = await instance.post(URLS.loginBuyer, user);

      localStorage.setItem(TOKEN, response.data);

      this.init(response.data);

    } catch (error) {
      this.showMessageError = true;
    }
  }

  @action.bound
  async register(name, email, password) {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    try {
      this.isRegistrError = false;
      await instance.post(URLS.registerBuyer, user);

      this.login(email, password);
    } catch (error) {
      this.isRegistrError = true;
    }
  }

  @action.bound
  async initBasket() {
    try {
      let responseBuyer = await getUserById(this.id);
      this.basket = responseBuyer.data.basket;

      this.getGoods();
    } catch (e) {

    }

  }

  @action.bound
  async removeFromBasket(idGood) {
    try {
      const response = await deleteGoodFromBasket(this.id, idGood);

      this.basket = response.data.basket;
      this.goodsInBasket = this.goodsInBasket.filter(
        (good) => good._id !== idGood
      );
    } catch (error) {
    }
  }

  @action.bound
  async initLikedGoods() {
    try {
      let responseBuyer = await getUserById(this.id);
      this.likes = responseBuyer.data.likedGoods;
      this.setLikedGoods();
    } catch (e) {

    }

  }

  @action.bound
  async logOutUser() {
    localStorage.removeItem(TOKEN);

    this.basket = [];
    this.name = "";
    this.ordersOfSeller = [];
    this.seller = null;
  }

  @action.bound
  async getGoods() {
    try {
      const responseGoods = await getGoodsInBasket(this.id);
      this.goodsInBasket = responseGoods.data;
    } catch (error) {
    }
  }

  @action.bound
  async setLikedGoods() {
    try {
      const responseGoods = await getLikedGoods(this.id);
      this.goodsInLikedGoods = responseGoods.data;
    } catch (error) {
    }
  }

  @computed
  get basketCost() {
    return this.goodsInBasket.reduce((sum, good) => sum + good.price, 0);
  }

  @action.bound
  async setSellerRole() {
    try {
      await updateUserRole(this.id, Roles.seller);
      await this.createShop();
      await this.login(this.email, this.password);
      this.roles.push(Roles.seller);

      this.files = [];
      this.logoURL = "";
    } catch (e) {

    }
  }

  @action.bound
  async createShop() {
    const response = uploadImages(this.files);
    const logo = await response;

    const seller = {
      name: this.newShopName,
      idUser: this.id,
      description: this.newShopDescription,
      logo: logo[0],
      services: [],
    };

    try {
      await postShop(seller);
    } catch (error) {
    }
  }

  @action.bound
  async initSeller(id) {
    try {
      const response = await getShopByUserId(id);
      this.seller = new Seller (response.data);

      const responseSellerOrders = await getSellerOrders(this.seller.id);
      this.ordersOfSeller = responseSellerOrders.data;

    } catch (error) {
    }
  }

  @action.bound
  async initGoodsOfSeller(id) {
    try {
      const responseGoodsOfSeller = await getGoodsOfSeller(id);
      this.goodsOfSeller = responseGoodsOfSeller.data;
    } catch (error) {
    }
  }

  @action
  async getOrders(id) {
    try {
      let response = await getUserOrders(id);
      this.orders = response.data;
    } catch (error) {
    }
  }

  @action
  async addOrder(idUser, idGood, idSeller) {
    try {
       await postOrder(idUser, idGood, idSeller);

       this.removeFromBasket(idGood);
       this.getOrders(this.id);

    } catch (error) {
    }
  }

  @action
  async acceptOrder(idOrder) {
    await updateOrderState(idOrder);
    await this.getOrders(this.id);
    const responseSellerOrders = await getSellerOrders(this.seller?.id);
    this.ordersOfSeller = responseSellerOrders.data;
  }

  @action.bound
  async createGood(values) {
    const good = {
      name: values.newGoodName,
      price: values.newGoodPrice,
      idSeller: this.seller?.id,
      description: values.newGoodDescription,
      image: values.photos[0],
      photos: values.photos,
      likes: 0,
      category: values.newGoodCategory,
      tags: []
    };

    try {
      await postGood(good);
    } catch (error) {
      this.errors.notCreated.push(error);
    }
  }

  @action
  async deleteOrder(idOrder) {
    try {
      const response = await deleteOrders(idOrder);
      this.orders = this.orders.filter(
          (order) => order.idOrder !== response.data._id
      );
      this.ordersOfSeller = this.ordersOfSeller.filter(
          (order) => order.idOrder !== response.data._id
      );
    } catch (e) {

    }

  }
}

export { UserStore, TOKEN };
