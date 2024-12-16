import { render, screen } from "@testing-library/react";
import NoMatch from "../NoMatch";

it("renders a 404 page", () => {
  render(<NoMatch />);
  const text = screen.getByText(/404 good buddy/i);
  expect(text).toBeInTheDocument();
});
