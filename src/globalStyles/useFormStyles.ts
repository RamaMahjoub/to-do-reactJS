import { css } from "@emotion/react";

export const useFormStyles = () => {
  return {
    container: css`
      width: 280px;
      height: 290px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--pink);
      align-self: center;
      border-radius: var(--md-radius);
      margin: auto;
    `,
    form: css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `,
  };
};
