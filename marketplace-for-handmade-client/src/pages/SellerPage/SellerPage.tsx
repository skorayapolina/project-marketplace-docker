import style from "./style.module.scss";
import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  GoodsContainer, GoodsContainerType
} from "../../components/GoodsContainer/GoodsContainer";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";
import ShopStore from "../../stores/ShopStore";
import Button from "../../components/Button/Button";
import { MdCancel } from "react-icons/md";
import { GoodsCategories } from "../../stores/helpers/interfaces";
import RootStore from "../../stores/RootStore";
import "react-toastify/dist/ReactToastify.css";
import { Form, Text, TextArea } from "informed";
import {
  validateLength,
  validateNumber,
} from "../../stores/helpers/validation";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import dropdownStyle from "../GoodsPage/dropdownStyle.module.scss";

@observer
class SellerPage extends Component<{match}> {
  store: ShopStore = new ShopStore();

  async componentDidMount() {
    const {match} = this.props;

    await Promise.all ([
        this.store.initSeller(match.params.id),
        this.store.initGoodsOfSeller(match.params.id)
    ]);
  }

  render() {
    const { user } = RootStore;
    const {match} = this.props;
    const idSeller = match.params.id;

    console.log(this.store.photosURLS);
    console.log(this.store.imageURL);

    const options = Array.from(Object.values(GoodsCategories));

    return (
      <div className={style.sellerPage}>
        <div>
          <div className={style.sellerPage__backImage}>
            <div className={style.sellerPage__logo}>
              <img
                src={this.store.seller.logo}
                alt="shop-logo"
                className={style.sellerPage__logoImg}
              />
            </div>
          </div>

          <div className={style.sellerPage__info}>
            <div
              className={classNames(
                style.sellerPage__textField,
                style.sellerPage__textField_name
              )}
            >
              {this.store.seller.name}
            </div>

            <div className={style.sellerPage__textField}>
              <div className={style.sellerPage__description}>
                {this.store.seller.description}
              </div>
            </div>
          </div>
        </div>

        {idSeller === user.seller?.id && (
          <div className={style.createGoodContainer}>
            <Button
              onClick={this.store.toggleForm}
              className={style.buttonShowModal}
            >
              <FormattedMessage id="createGood"/>
            </Button>

            <Form
              className={classNames(style.createGoodForm, {
                [style.createGoodForm__show]: this.store.isShowModal,
              })}
            >
              {({ formState }) => (
                <>
                  <div className={style.formContent}>
                    <div className={style.formTextInfo}>
                      <Button
                        styleType="small"
                        onClick={this.store.toggleForm}
                        className={style.createGoodForm__buttonClose}
                      >
                        <MdCancel />
                      </Button>

                      <p className={style.formTitle}>
                        <FormattedMessage id="addNewGood" />
                      </p>
                      <Text
                        className={classNames(
                          style.input,
                          style.createGoodForm__input
                        )}
                        field="newGoodName"
                        placeholder="name"
                        validate={validateLength}
                        validateOnChange
                      />
                      <label
                        htmlFor="newGoodName"
                        className={style.messageError}
                      >
                        {formState.errors.newGoodName}
                      </label>

                      <TextArea
                        className={classNames(
                          style.input,
                          style.createGoodForm__input,
                          style.createGoodForm__textarea
                        )}
                        field="newGoodDescription"
                        placeholder="description"
                        validate={validateLength}
                        validateOnChange
                      />
                      <label
                        htmlFor="newGoodDescription"
                        className={style.messageError}
                      >
                        {formState.errors.newGoodDescription}
                      </label>

                      <Text
                        type="number"
                        className={classNames(
                          style.input,
                          style.createGoodForm__input
                        )}
                        field="newGoodPrice"
                        placeholder="price"
                        validate={validateNumber}
                        validateOnChange
                      />
                      <label
                        htmlFor="newGoodPrice"
                        className={style.messageError}
                      >
                        {formState.errors.newGoodPrice}
                      </label>

                      <Dropdown
                        onChange={(event) => formState.values.newGoodCategory = event.value}
                        options={options}
                        placeholder="Choose category"
                        arrowClassName={dropdownStyle.dropArrow}
                        controlClassName={dropdownStyle.dropControl}
                        menuClassName={dropdownStyle.dropMenu}
                        className={dropdownStyle.drop}
                      />
                    </div>

                    <div className={style.fileInputs}>
                      <p className={style.fileInputs__text}>
                        <FormattedMessage id="adPhotos" />
                      </p>
                      <input
                        id="photos"
                        type="file"
                        name="files"
                        onChange={this.store.handleInputChange}
                        multiple
                        className={style.inputPhotos}
                      />
                      <label htmlFor="photos" className={style.labelPhotos}>
                        <FormattedMessage id="chooseFile" />
                      </label>
                      {Boolean(this.store.photosURLS.length) && (
                        <div className={style.photos}>
                          {this.store.photosURLS.map((url) =>
                            <div className={style.imageWrap} key={url}>
                              <img
                                src={url}
                                alt="good"
                                className={style.formImage}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    styleType="primary"
                    type="submit"
                    onClick={() => this.store.onCreateGood(user, formState.values)}
                    disabled={formState.invalid || this.store.photosURLS.length < 3}
                  >
                    <FormattedMessage id="createGood"/>
                  </Button>
                </>
              )}
            </Form>
          </div>
        )}

        <div className={style.sellerPage__body}>
          <GoodsContainer
            title={"Goods of " + this.store.seller.name}
            goods={this.store.goodsOfSeller}
            goodsContainerType={GoodsContainerType.sellerPage}
            updateGood={this.store.initGoodsOfSeller}
          />
        </div>
      </div>
    );
  }
}

export default SellerPage;
