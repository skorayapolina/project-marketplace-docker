import { action, observable } from "mobx";
import { UserStore } from "./UserStore";
import Localization from "./Localization";

class RootStore {
  @observable isLoading = true;
  @observable isServerError = false;

  @observable localization = new Localization();
  @observable user = new UserStore();

  @action.bound
  async init() {
    try {
      const { locale, fetchTranslation } = this.localization;

      await fetchTranslation(locale);
    } catch (error) {

    } finally {
      this.isLoading = false;
    }
  }
}

export default new RootStore();
