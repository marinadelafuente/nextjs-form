import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

// Stories
import { composeStories } from "@storybook/react";
import * as stories from "./form.stories";
const { FormStory } = composeStories(stories);

describe("Form component", () => {
  test("All the inputs should appear on the dom except 'Study Details'", async () => {
    render(<FormStory />);
    expect(screen.getByRole("heading", { name: "Form title" })).toBeInTheDocument();
    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Middle name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Age")).toBeInTheDocument();
    expect(screen.getByTestId("is-studying-radio-buttons")).toBeInTheDocument();
    expect(screen.queryByLabelText("Study details")).not.toBeInTheDocument();
    expect(screen.getByLabelText("Extra information")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
  test("After all the required fields are filled, the form should submit and a success message appear", async () => {
    render(<FormStory />);
    const user = userEvent.setup();

    const firstName = screen.getByLabelText("First name");
    await user.click(firstName);
    await user.type(firstName, "Marina");

    const middleName = screen.getByLabelText("Middle name");
    await user.click(middleName);
    await user.type(middleName, "M");

    const lastName = screen.getByLabelText("Last name");
    await user.click(lastName);
    await user.type(lastName, "de la Fuente");

    const email = screen.getByLabelText("Email");
    await user.click(email);
    await user.type(email, "fff@gmail.com");

    const age = screen.getByLabelText("Age");
    await user.click(age);
    await user.type(age, "66");

    const isStudying = screen.getByLabelText("Yes");
    await user.click(isStudying);

    const studyDetails = screen.getByLabelText("Study details");
    await user.click(studyDetails);
    await user.type(studyDetails, "Economics");

    const info = screen.getByLabelText("Extra information");
    await user.click(info);
    await user.type(info, "Extra Info");

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).not.toBeDisabled();
    await user.click(submitButton);

    await waitFor(
      () => {
        const alert = screen.getByText("Form succesfully sent");
        expect(alert).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  test("The submit button should be disabled if the required fields are empty", async () => {
    render(<FormStory />);
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeDisabled();
  });

  test("The submit button should be disabled if the is an error in age and email the fields", async () => {
    render(<FormStory />);
    const user = userEvent.setup();
    const firstName = screen.getByLabelText("First name");
    await user.click(firstName);
    await user.type(firstName, "Marina");

    const lastName = screen.getByLabelText("Last name");
    await user.click(lastName);
    await user.type(lastName, "de la Fuente");

    const email = screen.getByLabelText("Email");
    await user.click(email);
    await user.type(email, "fff.com");

    const age = screen.getByLabelText("Age");
    await user.click(age);
    await user.type(age, "2");

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeDisabled();
  });
});

test("The form to be resetted when the Cancel button is clicked", async () => {
  render(<FormStory />);
  const user = userEvent.setup();
  const firstName = screen.getByLabelText("First name");
  await user.click(firstName);
  await user.type(firstName, "Marina");

  const lastName = screen.getByLabelText("Last name");
  await user.click(lastName);
  await user.type(lastName, "de la Fuente");

  const email = screen.getByLabelText("Email");
  await user.click(email);
  await user.type(email, "fff.com");

  const age = screen.getByLabelText("Age");
  await user.click(age);
  await user.type(age, "2");

  const cancelButton = screen.getByRole("button", { name: "Cancel" });
  await user.click(cancelButton);

  expect(firstName).toHaveValue("");
  expect(lastName).toHaveValue("");
  expect(email).toHaveValue("");
  expect(age).toHaveValue(0);
});
