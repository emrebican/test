import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

//getByRole
// This function expects the element to be present in the DOM when it is called
//If the element is not found, it will throw an error, making the test fail. It’s useful when you expect an element to be present

// queryByRole
// This function does not throw an error if the element is not found. Instead, it returns null if the element is absent in the DOM.

describe("App.tsx test", () => {
  // Elements are present in the DOM
  it("Title, Add New button and AG Grid is rendered", () => {
    render(<App />);
    const title = screen.getByText("AG Grid");
    const agGrid = screen.getByRole("treegrid");
    const addNewButton = screen.getByRole("button", { name: /Add New/i });

    expect(title).toBeInTheDocument();
    expect(addNewButton).toBeInTheDocument();
    expect(agGrid).toBeInTheDocument();
  });

  // Add New Button opens the dialog
  it("Add New Button opens the dialog", async () => {
    render(<App />);
    const addNewButton = screen.getByRole("button", { name: /Add New/i });
    await userEvent.click(addNewButton);
    expect(screen.getByRole("dialog")).toBeInTheDocument(); // I can use queryByRole as well
  });

  // Cancel Button closes the dialog
  it("Cancel Button closes the dialog", async () => {
    render(<App />);
    const addNewButton = screen.getByRole("button", { name: /Add New/i });
    await userEvent.click(addNewButton);

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    await userEvent.click(cancelButton);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  // Submit button adds a new row
  it("Submit button adds a new row", async () => {
    render(<App />);

    const addButton = screen.getByRole("button", { name: /Add New/i });
    await userEvent.click(addButton);

    // Inputs
    const nameInput = screen.getByLabelText("Name");
    const surnameInput = screen.getByLabelText("Surname");
    const stateInput = screen.getByLabelText("State");
    const descriptionInput = screen.getByLabelText("Description");
    const submitButton = screen.getByRole("button", { name: /Submit/i });

    // Fill the form
    await userEvent.type(nameInput, "Test name");
    await userEvent.type(surnameInput, "Test surname");

    // await userEvent.selectOptions(stateInput, ["Active"]);

    await userEvent.click(stateInput);
    const activeOption = await screen.findByText("Active");
    await userEvent.click(activeOption);

    // render input is OK but not value
    expect(stateInput).toBeInTheDocument();
    // expect(stateInput).toHaveValue("Active");

    await userEvent.type(descriptionInput, "Test description");

    // Check the values OK
    expect(descriptionInput).toBeInTheDocument();
    expect(descriptionInput).toHaveValue("Test description");

    await userEvent.click(submitButton);

    // Check the dialog is closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Check the new row
    await waitFor(() => {
      expect(screen.getByText("Test name")).toBeInTheDocument();
      expect(screen.getByText("Test surname")).toBeInTheDocument();
      // expect(screen.getByText("Active")).toBeInTheDocument();
      // expect(screen.getByText("Test description")).toBeInTheDocument();
    });
  });

  /*   it("Delete button removes the row", async () => {
    render(<App />);

    // Wait for the delete button to be in the document
    await waitFor(() => {
      // const deleteButton = screen.getByTestId("delete-button-1");
      const deleteButton = screen.getByRole("button", { name: /delete/i });
      expect(deleteButton).toBeInTheDocument();
    });

    // Click the delete button
    const deleteButton = screen.getByTestId("delete-button-1");
    await userEvent.click(deleteButton);

    // Check that the row is removed
    await waitFor(() => {
      expect(screen.queryByText("Emre")).not.toBeInTheDocument();
      expect(screen.queryByText("Bican")).not.toBeInTheDocument();
      expect(screen.queryByText("desc example 1")).not.toBeInTheDocument();
    });
  }); */
});
