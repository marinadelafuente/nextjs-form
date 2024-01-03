"use client";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

// Components
import { Alert, Box, Button, Divider, FormControl, FormControlLabel, FormLabel, InputAdornment, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import FormInput from "../formInput/formInput";

// Types
import type { FormInputs } from "@/types/formTypes";

// Form Schema Validation
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultValues: FormInputs = {
  name: "",
  lastName: "",
  middleName: "",
  email: "",
  age: 0,
  isStudying: false,
  studyDetails: "",
  extraInfo: "",
};

// Definining Form Schema
const schema = Yup.object().shape({
  name: Yup.string().label("First name").trim().required().max(50),
  lastName: Yup.string().label("Last name").trim().required(),
  middleName: Yup.string(),
  email: Yup.string().label("Email").trim().required().email(),
  age: Yup.number()
    .label("Age")
    .nullable()
    .min(18)
    .max(99)
    .transform((value) => (isNaN(value) ? undefined : value))
    .required(),
  isStudying: Yup.boolean().required(),
  studyDetails: Yup.string(),
  extraInfo: Yup.string(),
});

export default function Form() {
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [studies, setStudies] = useState<boolean>(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormInputs>({
    mode: "onChange",
    defaultValues,
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await fetch("https://formsubmit.co/mdelafuente18@gmail.com", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setShowErrorMessage(true);
        throw new Error("Error in the service");
      }
      reset();
    } catch (error) {
      setShowErrorMessage(true);
      console.log(error);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} autoComplete="on" sx={{ height: "100%", maxHeight: "100%", display: "flex", flexDirection: "column", gap: "10px", color: "#1D1D20" }}>
        <Paper elevation={1} square={false} sx={{ p: 2, mb: "0.62rem" }}>
          <Typography variant="h5" component="h1" sx={{ fontFamily: "__Roboto_a789c4", mb: "1" }}>
            Form title
          </Typography>
          <Typography variant="body2" component="h2">
            Form description
          </Typography>
        </Paper>
        <Paper elevation={1} square={false} sx={{ p: 2 }}>
          <Typography variant="body1" component="h3" sx={{ pb: 3 }}>
            Personal details
          </Typography>
          <FormInput label="First name" name="name" control={control} rules={{ required: true, maxLength: 50 }} placeholder="First name" />
          <FormInput label="Middle name" name="middleName" helperText="Optional" control={control} placeholder="Middle name" />
          <FormInput label="Last name" name="lastName" control={control} rules={{ required: true }} placeholder="Last name" />
          <Divider sx={{ mb: 3 }} />
          <FormInput
            label="Email"
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            }}
            placeholder="email@email.com"
          />
          <FormInput label="Age" name="age" control={control} rules={{ required: true, min: 18, max: 100 }} isTypeNumber placeholder="Enter a number" />
        </Paper>
        <Paper elevation={1} square={false} sx={{ p: 2 }}>
          <FormControl>
            <FormLabel data-testid="is-studying-radio-buttons" id="is-studying-radio-buttons">
              Are you currently studying?
            </FormLabel>
            <Controller
              control={control}
              name="isStudying"
              render={({ field }) => (
                <RadioGroup {...field} aria-labelledby="is-studying-radio-buttons">
                  <FormControlLabel value={true} control={<Radio />} label="Yes" onClick={() => setStudies(true)} />
                  <FormControlLabel value={false} control={<Radio />} label="No" onClick={() => setStudies(false)} />
                </RadioGroup>
              )}
            />
          </FormControl>
          {studies && (
            <>
              <Typography variant="body2" component="h3" sx={{ py: 3 }}>
                Please provide the name(s) of what you are studying {studies}
              </Typography>
              <FormInput label="Study details" name="studyDetails" control={control} placeholder="Detail your study here" maxRows={10} isMultiline />
            </>
          )}
        </Paper>
        <Paper elevation={1} square={false} sx={{ p: 2 }}>
          <Typography variant="body1" component="h3" sx={{ pb: 2 }}>
            Extra information?
          </Typography>
          <FormInput label="Extra information" name="extraInfo" control={control} placeholder="Enter any additional information here" maxRows={10} isMultiline />
        </Paper>
        <Paper elevation={1} square={false} sx={{ p: 2 }}>
          <Typography variant="body1" component="h3" sx={{ pb: 2 }}>
            Complete form
          </Typography>
          <Box aria-label="loading button group" sx={{ width: "100%" }} display={"inline-flex"} gap={2}>
            <Button
              variant="outlined"
              type="button"
              sx={{ borderColor: "#20AD67", color: "#20AD67", width: "100%", textTransform: "capitalize" }}
              onClick={() => {
                reset();
                setShowErrorMessage(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={isSubmitting && !showErrorMessage}
              variant="contained"
              type="submit"
              sx={{ background: "#20AD67", width: "100%", pointerEvents: "auto", textTransform: "capitalize" }}
            >
              Submit
            </LoadingButton>
          </Box>
        </Paper>
      </Box>
      {showErrorMessage && (
        <Alert sx={{ mt: 2 }} severity="error">
          There was an issue sending your form. Please try again later
        </Alert>
      )}
      {isSubmitSuccessful && (
        <Alert sx={{ mt: 2 }} severity="success">
          Form succesfully sent
        </Alert>
      )}
    </>
  );
}
