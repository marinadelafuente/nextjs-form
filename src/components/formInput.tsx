import { Controller } from "react-hook-form";

// Components
import { TextField, InputAdornment } from "@mui/material";

// Types
import type { FormProps } from "@/types/formTypes";

export default function FormInput({ name, label, helperText, control, isError, rules, placeholder, isTypeNumber = false, isMultiline = false, maxRows }: FormProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { ref, ...field }, fieldState: { error } }) => {
        return (
          <TextField
            autoFocus
            {...field}
            fullWidth
            multiline={isMultiline ? true : false}
            {...(maxRows && { maxRows })}
            {...(placeholder && { placeholder })}
            type={isTypeNumber ? "number" : "text"}
            sx={[
              { pb: isMultiline || isTypeNumber ? 0 : 3 },
              isTypeNumber && {
                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                  display: "none",
                },
                "& input[type=number]": {
                  MozAppearance: "textfield",
                },
              },
            ]}
            label={label}
            error={isError}
            helperText={error?.message}
            InputProps={{
              startAdornment: <InputAdornment position="end" sx={{ display: "none" }}></InputAdornment>,
            }}
          />
        );
      }}
    />
  );
}
