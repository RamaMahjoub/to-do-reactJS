import { css } from "@emotion/react";

export const useColumnStyle = () => {
  const draggingOver = (isDraggingOver: boolean) => css`
    ${isDraggingOver
      ? css`
          background: var(--light-green);
        `
      : css`
          background: var(--lighter-gray);
        `}
  `;
  return {
    container: css`
      backgroundcolor: var(--lighter-gray);
      height: fit-content;
    `,
    droppable: (isDraggingOver: boolean) => css`
      ${draggingOver(isDraggingOver)}
      overflow: hidden;
      position: relative;
      border-radius: var(--md-radius);
    `,
    draggingOver,
    topbar: css`
      display: block;
      width: 100%;
      height: 4px;
      border-radius: var(--md-radius);
      background: var(--pink);
    `,
    title: css`
      margin: var(--md-space) var(--sm-space);
      color: var(--dark-gray);
    `,
    tasksContainer: css`
      max-height: calc(100vh - 145px);
      overflow: auto;
    `,
  };
};
