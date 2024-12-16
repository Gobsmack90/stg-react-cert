import { fireEvent, screen, waitFor } from "@testing-library/react";
import AuthProvider from "../AuthProvider";
import { renderWithProviders } from "../../utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";
import { createMemoryHistory } from "history";

it("renders Login page", () => {
  renderWithProviders(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  );
  const welcome = screen.getByText(/Log in/i);
  expect(welcome).toBeInTheDocument();
});

it("validates email", async () => {
  renderWithProviders(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  );

  const emailInput = screen.getByLabelText(/Email/i);
  expect(emailInput).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: "test" } });
  fireEvent.blur(emailInput);
  expect(emailInput).toHaveValue("test");
  const errorMessage = await screen.findByText(/Please enter a valid email./i);
  expect(errorMessage).toBeInTheDocument();
});

it("logs in", async () => {
  const history = createMemoryHistory({ initialEntries: ["/categories"] });
  renderWithProviders(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  );

  const emailInput = screen.getByLabelText(/Email/i);
  expect(emailInput).toBeInTheDocument();
  fireEvent.change(emailInput, { target: { value: "a@a.a" } });
  fireEvent.blur(emailInput);
  expect(emailInput).toHaveValue("a@a.a");
  const passwordInput = screen.getByLabelText(/Password/i);
  expect(passwordInput).toBeInTheDocument();
  fireEvent.change(passwordInput, { target: { value: "1234Abc" } });
  fireEvent.blur(passwordInput);
  expect(passwordInput).toHaveValue("1234Abc");

  const login = screen.getByRole("button", { name: "Sign in" });
  expect(login).toBeInTheDocument();
  fireEvent.click(login);
  await waitFor(() => {
    expect(history.location.pathname).toBe("/categories");
  });
});
