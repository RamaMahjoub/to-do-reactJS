import { css } from "@emotion/react";

export const useTextFieldStyles = () => {
  return {
    container: css`
      display: flex;
      border: 1px solid black;
      margin-bottom: var(--md-space);
      border-radius: var(--sm-radius);
      justify-content: center;
      align-items: center;
      padding: var(--xs-space);
    `,
    primaryInput: css`
      width: 100%;
      height: 25px;
      border: none;
      outline: none;
    `,
    textAreaInput: css`
      width: calc(100% - var(--sm-space));
      margin-bottom: var(--md-space);
    `,
    icon: (size: string) => css`
      ${size === "small"
        ? css`
            width: 15px;
            height: 15px;
          `
        : size === "medium" &&
          css`
            width: 20px;
            height: 20px;
          `}
      color: var(--dark-gray);
      margin: var(--no-space) var(--sm-space);
    `,
  };
};
