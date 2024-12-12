import { screen } from "@testing-library/react";
import Categories from "../Categories";
import { renderWithProviders } from "../../utils/test-utils";

it("should render", async () => {
  const initialCategories = ["cat", "dog", "person"];

  renderWithProviders(<Categories />, {
    preloadedState: {
      categories: initialCategories,
    },
  });

  const categoryDivs = await screen.findAllByTestId("categoryThumb");
  expect(categoryDivs.length).toBe(3);
});
