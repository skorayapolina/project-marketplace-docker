import { action, observable } from "mobx";
import {
  deleteUserById,
  getAllGoods,
  getSellers,
  getUserOrders,
  getUsers,
} from "../http/services";
import {IGood, ISeller, IUser} from "./helpers/interfaces";
import ModalStore from "./ModalStore";
import WarningModal from "../components/WarningModal/WarningModal";

class AdminStore {
  @observable goods: IGood[] = [];
  @observable users: IUser[] = [];
  @observable sellers: ISeller[] = [];

  @action.bound
  async init() {
    try {
      const response = await Promise.all ([
        getAllGoods(),
        getUsers(),
        getSellers()
      ]);

      this.goods = response[0].data;
      this.users = response[1].data;
      this.sellers = response[2].data;

      await Promise.all (
          this.users.map(async (user) => {
            const orders = await getUserOrders(user._id);
            user.orders = orders.data;
          })
      );
    } catch (e) {

    }
  }

  @action.bound
  async deleteUser(userId) {
    try {
      await ModalStore.showModal(WarningModal, {
        title: "delUser",
      });

      await deleteUserById(userId);
      await this.init();
    } catch (e) {

    }

  }
}

export default AdminStore;
