import { screen } from "@testing-library/react";
import AuthProvider from "../AuthProvider";
import { renderWithProviders } from "../../utils/test-utils";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";

it("renders home page", () => {
  renderWithProviders(
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  );
  const welcome = screen.getByText(/Chuck Norris Joke Extravaganza/i);
  expect(welcome).toBeInTheDocument();
});
