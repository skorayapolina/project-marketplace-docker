import { action, observable } from "mobx";
import {
  getGoodsWithQuery,
} from "../http/services";
import { IGood } from "./helpers/interfaces";

class GoodsStore {
  @observable goods: IGood[] = [];
  @observable currentPage = 1;
  @observable numberOfPages = 0;
  @observable searchName = "";
  @observable showReset = false;
  @observable searchCategory = "";
  @observable isLoading = false;

  @action.bound
  sortByLikes() {
    this.goods = this.goods
      .slice()
      .sort((a, b) => (a.likes > b.likes ? -1 : 1));
  }

  @action.bound
  async search() {
    this.isLoading = true;
    this.showReset = true;
    const config = {
      page: this.currentPage,
      category: this.searchCategory,
      name: this.searchName,
    };
    try {
      const response = await getGoodsWithQuery(config);
      this.goods = response.data.docs;
      this.numberOfPages = response.data.totalPages;
      this.sortByLikes();
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  }

  @action.bound
  async searchByName(name) {
    this.currentPage = 1;
    this.searchName = name.value;
    this.search();
  }

  @action.bound
  async searchByCategory(category) {
    this.currentPage = 1;
    this.searchCategory = category;
    this.search();
  }

  @action.bound
  async previousPage() {
    this.currentPage = this.currentPage - 1;
    this.search();
  }

  @action.bound
  async nextPage() {
    this.currentPage = this.currentPage + 1;
    this.search();
  }

  @action.bound
  async setPage(page) {
    this.currentPage = page;
    this.search();
  }

  @action
  async resetGoods() {
    this.searchName = "";
    this.searchCategory = "";
    this.currentPage = 1;
    this.search();
    this.showReset = false;
  }
}

export default GoodsStore;
