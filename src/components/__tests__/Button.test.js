import { render, screen } from "@testing-library/react";
import Button from "../Button";

it("renders a button", () => {
  render(
    <Button
      isLarge={true}
      onClick={() => console.log("hello")}
      isDisabled={false}
      children={"hi"}
    />
  );
  const button = screen.getByText(/hi/i);
  expect(button).toBeInTheDocument();
});
