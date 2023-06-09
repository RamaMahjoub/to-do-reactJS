/** @jsxImportSource @emotion/react */
import { FC, ReactNode } from "react";
import { useFormStyles } from "../globalStyles/useFormStyles";

interface Props {
  title: string;
  children: ReactNode;
}
const FormContainer: FC<Props> = ({ title, children }) => {
  const formStyles = useFormStyles();
  return (
    <div css={formStyles.container}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default FormContainer;
