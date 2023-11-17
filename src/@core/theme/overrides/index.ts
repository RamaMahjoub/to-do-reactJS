import { Theme } from "@mui/material/styles";
import { ComponentsPropsList } from "@mui/material";

import MuiButton from "./button";
import MuiInput from "./input";
import MuiDialog from "./dialog";
import MuiTypography from "./typography";
import MuiChip from "./chip";
import MuiCard from "./card";

export type OwnerStateThemeType = {
  theme: Theme;
  ownerState: ComponentsPropsList[keyof ComponentsPropsList] &
    Record<string, unknown>;
};

const input = MuiInput();
const dailog = MuiDialog();
const button = MuiButton();
const chip = MuiChip();
const card = MuiCard();

const Overrides = {
  ...input,
  ...button,
  ...dailog,
  ...chip,
  ...card,
  ...MuiTypography,
};

export default Overrides;
