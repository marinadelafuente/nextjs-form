import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";
import { ReactElement, ReactNode, FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

// Decorator for React Hook Forms in Storybook
const StorybookFormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(action("[React Hooks Form] Submit"))}>{children}</form>
    </FormProvider>
  );
};

export default function formDec() {
  return function Form(Story: FC): ReturnType<StoryFn<ReactElement>> {
    return (
      <StorybookFormProvider>
        <Story />
      </StorybookFormProvider>
    );
  };
}
