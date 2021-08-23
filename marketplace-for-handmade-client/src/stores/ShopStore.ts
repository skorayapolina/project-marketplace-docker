import { action, observable } from "mobx";
import {getGoodsOfSeller, getSellerById, uploadImages} from "../http/services";
import {IGood} from "./helpers/interfaces";
import { toast } from "react-toastify";

class ShopStore {
  @observable seller = {
    _id: "",
    description: "",
    name: "",
    services: [],
    logo: "",
    idUser: "",
  };
  @observable files = [];
  @observable photosURLS: string[] = [];
  @observable imageURL = "";
  @observable isShowModal = false;
  photos: string[] = [];

  @observable goodsOfSeller: IGood[] = [];

  @observable formStateCategory = "";

  @action.bound
  async initSeller(id) {
    try {
      const responseSeller = await getSellerById(id);
      this.seller = responseSeller.data;
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

  @action.bound
  toggleForm() {
    this.isShowModal = !this.isShowModal;
  }

  @action.bound
  async onCreateGood(user, values) {
    this.isShowModal = !this.isShowModal;

    try {
      await this.handleDrop(this.files);
      values.photos = this.photos;

      await user.createGood(values);
      if (user.errors.notCreated.length === 0) {
        toast.success("Good was created!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
      await this.initGoodsOfSeller(user.seller.id);


      if (user.errors.notCreated.length !== 0) {
        user.errors.notCreated.pop();
        throw Error("good wasn't created, check internet connection");
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  @action.bound
  handleInputChange(event) {
    const target = event.target;

    const files = target.files;
    const name = target.name;

    this[name] = files;

    this.photosURLS = Array.from(this.files).map((file) =>
      window.URL.createObjectURL(file)
    );
  }

  @action.bound
  handleDrop = async (files) => {
    try {
      const response = uploadImages(files);
      this.photos = await response;
    } catch (e) {

    }

  };
}

export default ShopStore;
