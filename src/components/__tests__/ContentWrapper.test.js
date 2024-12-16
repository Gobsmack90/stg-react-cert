import { render, screen } from "@testing-library/react";
import ContentWrapper from "../ContentWrapper";

it("renders the component", () => {
  render(
    <ContentWrapper title="hi">
      <p>hello</p>
    </ContentWrapper>
  );
  const title = screen.getByText(/hi/i);
  expect(title).toBeInTheDocument();
  const child = screen.getByText(/hello/i);
  expect(child).toBeInTheDocument();
});
