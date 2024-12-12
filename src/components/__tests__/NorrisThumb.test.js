import { render, screen } from "@testing-library/react";
import NorrisThumb from "../NorrisThumb";

it("renders a chuck norris thumbnail", () => {
  render(<NorrisThumb chosenIndex={1} />);
  const img = screen.getByAltText(/Chuck Norris/i);
  expect(img.src).toContain("https://imgur.com/7rGJS0S.jpeg");
});
