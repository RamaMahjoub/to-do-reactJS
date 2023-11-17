import { useTheme } from "@mui/material/styles";
import { hexToRGBA } from "../utils/hex-to-rgba";

export type UseBgColorType = {
  [key: string]: {
    color: string;
    backgroundColor: string;
  };
};

const useBgColor = () => {
  const theme = useTheme();

  return {
    primaryLight: {
      color: theme.palette.primary.main,
      backgroundColor: hexToRGBA(theme.palette.primary.main, 0.16),
    },
    secondaryLight: {
      color: theme.palette.secondary.main,
      backgroundColor: hexToRGBA(theme.palette.secondary.main, 0.16),
    },
    successLight: {
      color: theme.palette.success.main,
      backgroundColor: hexToRGBA(theme.palette.success.main, 0.16),
    },
    errorFilled: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.main,
    },
    errorLight: {
      color: theme.palette.error.main,
      backgroundColor: hexToRGBA(theme.palette.error.main, 0.16),
    },
    warningLight: {
      color: theme.palette.warning.main,
      backgroundColor: hexToRGBA(theme.palette.warning.main, 0.16),
    },
    infoFilled: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.info.main,
    },
    infoLight: {
      color: theme.palette.info.main,
      backgroundColor: hexToRGBA(theme.palette.info.main, 0.16),
    },
  };
};

export default useBgColor;
