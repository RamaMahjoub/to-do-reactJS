import { ThemeColor } from "../../../@core/layouts/types";

export interface Colors {
  [key: string]: ThemeColor;
}

export const colors: Colors = {
  "To do": "info",
  "In progress": "warning",
  Completed: "success",
  Important: 'error-filled',
  Normal: 'info-filled',
};

