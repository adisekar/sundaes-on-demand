import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("Inital conditions", () => {
  // Button disabled initially and checkbox is unchecked
  render(<SummaryForm />);

  // find element with role of button and text of 'Confirm prder'
  const buttonElement = screen.getByRole("button", { name: /confirm order/i });
  expect(buttonElement).toBeDisabled();
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
});

test("On checking checkbox, button becomes enabled, and on unchecking becomes disabled", () => {
  // Button disabled initially and checkbox is unchecked
  render(<SummaryForm />);

  const buttonElement = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  // Checking Checkbox
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(buttonElement).toBeEnabled();

  // Unchecking checkbox
  userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(buttonElement).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
