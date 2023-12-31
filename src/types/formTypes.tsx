export type FormInputs = {
  name: string;
  lastName: string;
  email: string;
  middleName?: string;
  isStudying: boolean;
  age: number;
  studyDetails?: string;
  extraInfo?: string;
};

export type FormProps = {
  name: string;
  label: string;
  helperText?: string;
  control: any;
  isError: boolean;
  rules?: { required?: boolean; maxLength?: number; min?: number; max?: number; pattern?: any };
  placeholder?: string;
  isTypeNumber?: boolean;
  isMultiline?: boolean;
  maxRows?: number;
};
