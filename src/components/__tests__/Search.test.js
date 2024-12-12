import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import AuthProvider from "../AuthProvider";
import Search from "../Search";

it("renders search page", () => {
  renderWithProviders(
    <AuthProvider>
      <Search />
    </AuthProvider>
  );
  const search = screen.getByText(
    /Search results filter out explicit content./i
  );
  expect(search).toBeInTheDocument();
});
