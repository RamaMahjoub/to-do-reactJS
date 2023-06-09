import { css } from "@emotion/react";

export const useTaskStyles = () => {
  const item = (color: string) => css`
    margin: var(--sm-space) var(--no-space);
    ${color === "dark-gray"
      ? css`
          color: var(--dark-gray);
        `
      : color === "light-gray"
      ? css`
          color: var(--light-gray);
        `
      : color === "white" &&
        css`
          color: white;
        `}
  `;
  return {
    task: css`
      background-color: white;
      margin: var(--md-space) var(--sm-space);
      padding: var(--md-space);
      border-radius: var(--lg-radius);
    `,
    priorityContainer: (taskPriority: string) => css`
      ${item("white")}
      ${taskPriority === "normal"
        ? css`
            background: var(--blue);
          `
        : css`
            background: var(--red);
          `};
      width: fit-content;
      padding: var(--xs-space) var(--sm-space);
      border-radius: var(--md-radius);
    `,
    actionsContainer: css`
      display: flex;
      justify-content: flex-end;
    `,
    action: css`
      border: none;
      background: none;
    `,
    item,
  };
};
