import { action, observable } from "mobx";

class UpdateGoodForm {
  @observable newInfoGood = {
    id: "",
    goodName: "",
    description: "",
    price: 0,
    goodCategory: "",
  };

  constructor(payload) {

    this.newInfoGood.id = payload.good._id;
    this.newInfoGood.goodName = payload.good.name;
    this.newInfoGood.description = payload.good.description as string;
    this.newInfoGood.price = payload.good.price;
    this.newInfoGood.goodCategory = payload.good.category as string;
  }

  @action.bound
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.newInfoGood[name] = value;
  }

  @action.bound
  async onSubmit(values, func?) {
    values.values.id = this.newInfoGood.id;
    func(values.values);
  }
}

export default UpdateGoodForm;
