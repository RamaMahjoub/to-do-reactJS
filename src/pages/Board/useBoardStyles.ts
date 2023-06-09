import { css } from "@emotion/react";

export const useBoardStyles = () => {
  return {
    board: css`
      width: 100%;
      height: 100%;
    `,
    columnsContainer: css`
      height: 90%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--md-space);
    `,
    topbar: css`
      width: 100%;
      height: 10%;
      display: flex;
      align-items: center;
      margin: var(--no-space);
      justify-content: space-between;
    `,
  };
};
