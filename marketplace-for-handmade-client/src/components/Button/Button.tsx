import React, { ButtonHTMLAttributes, FunctionComponent } from "react";
import classNames from "classnames";

import style from "./style.module.scss";

const btnTypes = {
  secondary: style.btn__secondary,
  primary: style.btn__primary,
  small: style.btn__small,
  medium: style.btn__medium
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: keyof typeof btnTypes;
  overlayClassName?: string;
}

const Button: FunctionComponent<Props> = ({
  className,
  children,
  styleType = "primary",
  type = "button",
  ...props
}) => (
  <button
    type={type}
    className={classNames(style.btn, btnTypes[styleType], className)}
    {...props}
  >
    {children}
  </button>
);

export default Button;
