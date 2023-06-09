import { css } from "@emotion/react";

export const useButtonStyles = () => {
  const button = css`
    border-radius: var(--md-radius);
    border: none;
    width: 60px;
    height: 20px;
  `;

  const pinkButton = css`
    ${button};
    background: var(--pink);
  `;

  const secondaryButton = ({
    bg,
    width,
  }: {
    bg?: string;
    width?: string;
  }) => css`
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--sm-space) var(--no-space);
    ${width === "full" &&
    css`
      width: 100%;
    `};
    ${bg === "none" &&
    css`
      background: none;
    `}
    color: var(--dark-gray);
    height: 28px;
    border-bottom-left-radius: var(--md-radius);
    border-bottom-right-radius: var(--md-radius);
  `;
  return {
    button,
    pinkButton,
    secondaryButton,
  };
};
