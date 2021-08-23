import React, { Component } from "react";
import style from "./style.module.scss";
import { observer } from "mobx-react";
import RootStore from "../../stores/RootStore";
import { ROUTES } from "../../routes/routes";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Form, Text } from "informed";
import {validateEmail, validateLength} from "../../stores/helpers/validation";
import { action } from "mobx";
import { withRouter } from "react-router";
import MessageError from "../../components/MessageError/MessageError";
import Button from "../../components/Button/Button";
import classNames from "classnames";

@observer
class Login extends Component<{history}> {
  @action
  login = (user, email, password) => async () =>{
    await user.login(email, password);
    const {history} = this.props;
    if (!user.showMessageError) {
      history.push("/");
    }
  };

  render() {
    const { user } = RootStore;

    return (
      <>
        <div className={style.login}>
          <div>
            <MessageError message="incorrectEmOrPass" show={user.showMessageError} />
          </div>

          <Form className={style.formLog}>
            {({ formState }) => (
              <>
                <p className={style.loginForm__title}>
                  <FormattedMessage id="signIn" />
                </p>

                <Text
                  field="email"
                  className={classNames(style.input, style.loginInput)}
                  onChange={user.handleInputChange}
                  placeholder="email"
                  value={user.email}
                  id="email"
                  validate={validateEmail}
                  validateOnChange
                  autoFocus
                />
                <label htmlFor="email" className={style.messageError}>
                  {formState.errors.email}
                </label>

                <Text
                  type="password"
                  field="password"
                  className={classNames(style.input, style.loginInput)}
                  onChange={user.handleInputChange}
                  placeholder="password"
                  value={user.password}
                  id="password"
                  validate={validateLength}
                  validateOnChange
                />
                <label htmlFor="password" className={style.messageError}>
                  {formState.errors.password}
                </label>

                <Button
                  type="submit"
                  className={style.buttonSign}
                  onClick={
                    this.login(
                      user,
                      formState.values.email,
                      formState.values.password
                    )
                  }
                  disabled={formState.invalid || !formState.values.email || !formState.values.password}
                >
                  <FormattedMessage id="signIn" />
                </Button>

                <NavLink
                  to={ROUTES.users.registration}
                  className={style.linkToRegistr}
                >
                  <FormattedMessage id="register" />
                </NavLink>
              </>
            )}
          </Form>
        </div>
      </>
    );
  }
}

export default withRouter(Login);
