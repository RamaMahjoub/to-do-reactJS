import { Settings } from "../context/settingContext";
import { ThemeOptions } from "@mui/material";
import breakpoints from "./breakpoints";
import palette from "./palette";
import shadows from "./shadows";
import typography from './typography'
import spacing from './spacing'
import overrides from "./overrides";

const themeOptions = (settings: Settings): ThemeOptions => {
  const { mode } = settings;

  const mergedThemeConfig: ThemeOptions = {
    breakpoints: breakpoints(),
    components: overrides,
    palette: palette(mode),
    ...spacing,
    shape: {
      borderRadius: 6,
    },
    mixins: {
      toolbar: {
        minHeight: 64,
      },
    },
    shadows: shadows(mode),
    typography,
  };

  return mergedThemeConfig
};

export default themeOptions;
