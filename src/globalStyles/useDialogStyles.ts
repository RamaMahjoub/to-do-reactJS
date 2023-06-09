import { css } from "@emotion/react";

export const useDialogStyle = () => {
  return {
    dialog: css`
      .MuiPaper-root {
        width: 300px;
      }
    `,
    actions: css`
      padding: var(--no-space) var(--xl-space) var(--xl-space) var(--xl-space);
    `,
  };
};
