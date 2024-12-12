import { screen } from "@testing-library/react";
import AuthProvider from "../AuthProvider";
import { renderWithProviders } from "../../utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import Login from "../Login";

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
