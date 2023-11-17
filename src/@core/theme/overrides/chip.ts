import { OwnerStateThemeType } from ".";

const Chip = () => {
  return {
    MuiChip: {
      styleOverrides: {
        root: ({ theme, ownerState }: OwnerStateThemeType) => ({
          fontWeight: 500,
          fontSize: theme.typography.body2.fontSize,
          ...(ownerState.size === "medium" && {
            height: 30,
          }),
          "&.MuiChip-rounded": {
            borderRadius: 4,
          },
        }),
        outlined: ({ theme }: OwnerStateThemeType) => ({
          "&.MuiChip-colorDefault": {
            borderColor: `rgba(${theme.palette.customColors.main}, 0.2)`,
          },
        }),
        labelSmall: ({ theme }: OwnerStateThemeType) => ({
          paddingLeft: theme.spacing(2.5),
          paddingRight: theme.spacing(2.5),
        }),
      },
    },
  };
};

export default Chip;
