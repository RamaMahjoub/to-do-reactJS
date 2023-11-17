import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { forwardRef } from "react";
import { hexToRGBA } from "./../../../utils/hex-to-rgba";

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  alignItems: "flex-start",
  "& .MuiInputLabel-root": {
    transform: "none",
    lineHeight: 1.154,
    position: "relative",
    marginBottom: theme.spacing(1),
    fontSize: theme.typography.body2.fontSize,
    color: `${theme.palette.text.primary} !important`,
  },
  "& .MuiInputBase-root": {
    borderRadius: 8,
    backgroundColor: "transparent !important",
    border: `1px solid ${hexToRGBA(theme.palette.customColors.main, 0.2)}`,
    transition: theme.transitions.create(["border-color", "box-shadow"], {
      duration: theme.transitions.duration.shorter,
    }),
    "&:not(.Mui-focused):not(.Mui-disabled):not(.Mui-error):hover": {
      borderColor: `${hexToRGBA(theme.palette.customColors.main, 0.28)}`,
    },
    "&:before, &:after": {
      display: "none",
    },
    "&.MuiInputBase-sizeSmall": {
      borderRadius: 6,
    },
    "&.Mui-error": {
      borderColor: theme.palette.error.main,
    },
    "&.Mui-focused": {
      boxShadow: theme.shadows[2],
      "& .MuiInputBase-input:not(.MuiInputBase-readOnly):not([readonly])::placeholder":
        {
          transform: "translateX(4px)",
        },
      "&.MuiInputBase-colorPrimary": {
        borderColor: theme.palette.primary.main,
      },
      "&.MuiInputBase-colorSecondary": {
        borderColor: theme.palette.secondary.main,
      },
      "&.MuiInputBase-colorInfo": {
        borderColor: theme.palette.info.main,
      },
      "&.MuiInputBase-colorSuccess": {
        borderColor: theme.palette.success.main,
      },
      "&.MuiInputBase-colorWarning": {
        borderColor: theme.palette.warning.main,
      },
      "&.MuiInputBase-colorError": {
        borderColor: theme.palette.error.main,
      },
      "&.Mui-error": {
        borderColor: theme.palette.error.main,
      },
    },
    "&.Mui-disabled": {
      backgroundColor: `${theme.palette.action.selected} !important`,
    },
    "& .MuiInputAdornment-root": {
      marginTop: "0 !important",
    },
  },
  "& .MuiInputBase-input": {
    color: theme.palette.text.secondary,
    "&:not(textarea)": {
      padding: "15.5px 13px",
    },
    "&:not(textarea).MuiInputBase-inputSizeSmall": {
      padding: "7.5px 13px",
    },
    "&:not(.MuiInputBase-readOnly):not([readonly])::placeholder": {
      transition: theme.transitions.create(["opacity", "transform"], {
        duration: theme.transitions.duration.shorter,
      }),
    },
    // ** For Autocomplete
    "&.MuiInputBase-inputAdornedStart:not(.MuiAutocomplete-input)": {
      paddingLeft: 0,
    },
    "&.MuiInputBase-inputAdornedEnd:not(.MuiAutocomplete-input)": {
      paddingRight: 0,
    },
  },

  // ** For Textarea
  "& .MuiInputBase-multiline": {
    padding: "15.25px 13px",
    "&.MuiInputBase-sizeSmall": {
      padding: "7.25px 13px",
    },
    "& textarea.MuiInputBase-inputSizeSmall:placeholder-shown": {
      overflowX: "hidden",
    },
  },
}));

export const CustomTextField = forwardRef((props: TextFieldProps, ref) => {
  const { size = "small", InputLabelProps, ...rest } = props;

  return (
    <StyledTextField
      size={size}
      inputRef={ref}
      {...rest}
      variant="filled"
      InputLabelProps={{ ...InputLabelProps, shrink: true }}
    />
  );
});
