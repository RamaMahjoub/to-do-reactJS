import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Icon from "../../component/icon";
import { hexToRGBA } from "../../utils/hex-to-rgba";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { SettingsContext } from "../../context/settingContext";
import { PaletteMode } from "@mui/material";

const ModeToggler = () => {
  const theme = useTheme();
  const { settings, saveSettings } = useContext(SettingsContext);
  const handleModeToggle = (mode: PaletteMode) => {
    saveSettings({ ...settings, mode });
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
      }}
    >
      <IconButton
        size="small"
        sx={{
          color: "text.secondary",
          backgroundColor:
            settings.mode === "light"
              ? hexToRGBA(theme.palette.secondary.main, 0.08)
              : "initial",
        }}
        onClick={() => handleModeToggle("light")}
      >
        <Icon icon="tabler:sun" />
      </IconButton>
      <IconButton
        size="small"
        sx={{
          color: "text.secondary",
          backgroundColor:
            settings.mode === "dark"
              ? hexToRGBA(theme.palette.secondary.main, 0.08)
              : "initial",
        }}
        onClick={() => handleModeToggle("dark")}
      >
        <Icon icon="tabler:moon-stars" />
      </IconButton>
    </Box>
  );
};

export default ModeToggler;
