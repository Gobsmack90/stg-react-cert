import { screen } from "@testing-library/react";
import Home from "../Home";
import AuthProvider from "../AuthProvider";
import { renderWithProviders } from "../../utils/test-utils";
import { BrowserRouter } from "react-router-dom";

it("renders home page", () => {
  renderWithProviders(
    <AuthProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </AuthProvider>
  );
  const welcome = screen.getByText(/Welcome/i);
  expect(welcome).toBeInTheDocument();
});
