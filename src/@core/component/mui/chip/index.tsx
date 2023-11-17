import MuiChip, { ChipProps } from "@mui/material/Chip";
import useBgColor, { UseBgColorType } from "../../../hooks/useBgColor";
import clsx from "clsx";
import { ThemeColor } from "../../../layouts/types";

export type CustomChipProps = ChipProps & {
  skin?: "light";
  rounded?: boolean;
  customcolor: ThemeColor;
};

const Chip = (props: CustomChipProps) => {
  const { sx, rounded, skin, customcolor } = props;

  const bgColors = useBgColor();

  const colors: UseBgColorType = {
    primary: { ...bgColors.primaryLight },
    secondary: { ...bgColors.secondaryLight },
    success: { ...bgColors.successLight },
    error: { ...bgColors.errorLight },
    'error-filled': { ...bgColors.errorFilled },
    warning: { ...bgColors.warningLight },
    info: { ...bgColors.infoLight },
    'info-filled': { ...bgColors.infoFilled },
  };

  const propsToPass = { ...props };
  propsToPass.rounded = undefined;

  console.log(customcolor, colors[customcolor!]);
  return (
    <MuiChip
      {...propsToPass}
      variant="filled"
      className={clsx({
        "MuiChip-rounded": rounded,
        "MuiChip-light": skin === "light",
      })}
      sx={skin === "light" && customcolor ? Object.assign(colors[customcolor], sx) : sx}
    />
  );
};

export default Chip;
