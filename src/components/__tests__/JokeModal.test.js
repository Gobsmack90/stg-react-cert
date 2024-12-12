import { screen } from "@testing-library/react";
import JokeModal from "../JokeModal";
import { renderWithProviders } from "../../utils/test-utils";

it("renders modal", () => {
  renderWithProviders(<JokeModal category={"cat"} setCategory={() => null} />);
  const heading = screen.getByText(/cat/i);
  expect(heading).toBeInTheDocument();
});
