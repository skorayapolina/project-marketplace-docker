import style from "./style.module.scss";
import React, { Component } from "react";
import { observer } from "mobx-react";
import RootStore from "../../stores/RootStore";
import { FormattedMessage } from "react-intl";
import { ROUTES } from "../../routes/routes";
import { NavLink } from "react-router-dom";
import { Form, Text } from "informed";
import {validateEmail, validateLength} from "../../stores/helpers/validation";
import { withRouter } from "react-router";
import Button from "../../components/Button/Button";
import classNames from "classnames";
import MessageError from "../../components/MessageError/MessageError";

@observer
class Registration extends Component<{history}> {
  register = (values) => async () => {
    const { user } = RootStore;

    await user.register (values.nameForRegistration, values.email, values.password);
    const {history} = this.props;
    if (!user.isRegistrError) {
      history.push("/");
    }
  };

  render() {
    const { user } = RootStore;

    return (
      <div className={style.registration}>
          <div>
              <MessageError message="alreadyExist" show={user.isRegistrError} />
          </div>

        <Form className={classNames(style.formLog, style.registrationForm)}>
          {({ formState }) => (
            <>
              <p className={style.formTitle}>
                <FormattedMessage id="register" />
              </p>
              <Text
                className={classNames(style.input, style.registrationInput)}
                placeholder="name"
                id="nameForRegistration"
                field="nameForRegistration"
                validate={validateLength}
                validateOnChange
                autoFocus
              />
              <label htmlFor="nameForRegistration" className={style.messageError}>
                {formState.errors.nameForRegistration}
              </label>

              <Text
                className={classNames(style.input, style.registrationInput)}
                onChange={user.handleInputChange}
                placeholder="email"
                id="email"
                field="email"
                validate={validateEmail}
                validateOnChange
              />
              <label htmlFor="email"  className={style.messageError}>
                {formState.errors.email}
              </label>

              <Text
                className={classNames(style.input, style.registrationInput)}
                type="password"
                value={user.password}
                onChange={user.handleInputChange}
                placeholder="password"
                id="password"
                field="password"
                validate={validateLength}
                validateOnChange
              />
              <label htmlFor="password" className={style.messageError}>
                {formState.errors.password}
              </label>

              <Button
                onClick={this.register(formState.values)}
                disabled={formState.invalid
                            || !formState.values.nameForRegistration
                            || !formState.values.email
                            || !formState.values.password}
                className={style.buttonSign}
              >
                <FormattedMessage id="register" />
              </Button>

              <NavLink to={ROUTES.users.login} className={style.linkToLog}>
                <FormattedMessage id="signIn" />
              </NavLink>
            </>
          )}
        </Form>
      </div>
    );
  }
}

export default withRouter(Registration);
