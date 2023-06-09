/** @jsxImportSource @emotion/react */
import { FC, ReactNode, HTMLProps } from "react";
import { useTextFieldStyles } from "../globalStyles/useTextFieldStyles";
import { SerializedStyles } from "@emotion/react";

interface Props extends HTMLProps<HTMLInputElement> {
  icon?: ReactNode;
  css?: SerializedStyles;
}
const FormInput: FC<Props> = ({ placeholder, type, icon, css, ...rest }) => {
  const textFieldStyles = useTextFieldStyles();
  return (
    <div css={textFieldStyles.container}>
      {icon}
      <input autoComplete="off" placeholder={placeholder} type={type} {...rest} />
    </div>
  );
};

export default FormInput;
