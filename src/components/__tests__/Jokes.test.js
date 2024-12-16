import { fireEvent, getByRole, screen, within } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import Jokes from "../Jokes";
import AuthProvider from "../AuthProvider";

const initialJokes = [
  {
    joke: {
      categories: ["money"],
      created_at: "2020-01-05 13:42:23.484083",
      icon_url: "https://api.chucknorris.io/img/avatar/chuck-norris.png",
      id: "3sw5A0AMRlOgPfZdtTM3wg",
      updated_at: "2020-05-22 06:16:41.133769",
      url: "https://api.chucknorris.io/jokes/3sw5A0AMRlOgPfZdtTM3wg",
      value:
        'There was no "Great deppresion". Just a time when Chuck Norris didn\'t have money.',
    },
    timestamp: 1734038681006,
    categories: ["money"],
  },
  {
    joke: {
      categories: ["money"],
      created_at: "2020-01-05 13:42:26.766831",
      icon_url: "https://api.chucknorris.io/img/avatar/chuck-norris.png",
      id: "Oqe6nb1QQCyf6Fq6d0duBg",
      updated_at: "2020-05-22 06:16:41.133769",
      url: "https://api.chucknorris.io/jokes/Oqe6nb1QQCyf6Fq6d0duBg",
      value:
        "Chuck Norris walked into a bank during a robbery. When the crooks saw Chuck, they returned all the money then gave the teller all the money from their own wallets.",
    },
    timestamp: 1734038682826,
    categories: ["money"],
  },
];

it("renders joke page", async () => {
  renderWithProviders(
    <AuthProvider>
      <Jokes />
    </AuthProvider>,
    {
      preloadedState: {
        viewedJokes: initialJokes,
      },
    }
  );
  const categoryDivs = await screen.findAllByTestId("jokeRow");
  expect(categoryDivs.length).toBe(2);
});

it("sorts based on category and timestamp", async () => {
  renderWithProviders(
    <AuthProvider>
      <Jokes />
    </AuthProvider>,
    {
      preloadedState: {
        viewedJokes: initialJokes,
      },
    }
  );

  const categoryDivs = await screen.findAllByTestId("jokeRow");
  expect(
    within(categoryDivs[0]).getByText(
      /Chuck Norris walked into a bank during a robbery./i
    )
  ).toBeInTheDocument();
  const categorySort = screen.getByText(/Category/i);
  fireEvent.click(categorySort);
  const categoryDivs2 = await screen.findAllByTestId("jokeRow");
  expect(
    within(categoryDivs2[0]).getByText(/There was no "Great deppresion"./i)
  ).toBeInTheDocument();
  const dateViewedSort = screen.getByText(/Date Viewed/i);
  fireEvent.click(dateViewedSort);
  const categoryDivs3 = await screen.findAllByTestId("jokeRow");
  expect(
    within(categoryDivs3[0]).getByText(/There was no "Great deppresion"./i)
  ).toBeInTheDocument();
  fireEvent.click(dateViewedSort);
  const categoryDivs4 = await screen.findAllByTestId("jokeRow");
  expect(
    within(categoryDivs4[0]).getByText(
      /Chuck Norris walked into a bank during a robbery./i
    )
  ).toBeInTheDocument();
});

it("should remove a joke", async () => {
  renderWithProviders(
    <AuthProvider>
      <Jokes />
    </AuthProvider>,
    {
      preloadedState: {
        viewedJokes: initialJokes,
      },
    }
  );

  const categoryDivs = await screen.findAllByTestId("jokeRow");
  expect(categoryDivs.length).toBe(2);
  expect(
    within(categoryDivs[0]).getByText(
      /Chuck Norris walked into a bank during a robbery./i
    )
  ).toBeInTheDocument();

  const deleteButton = within(categoryDivs[0]).getByRole("button", {
    name: "X",
  });
  fireEvent.click(deleteButton);

  const categoryDivsAfter = await screen.findAllByTestId("jokeRow");
  expect(categoryDivsAfter.length).toBe(1);
});

it("should clear all jokes", async () => {
  renderWithProviders(
    <AuthProvider>
      <Jokes />
    </AuthProvider>,
    {
      preloadedState: {
        viewedJokes: initialJokes,
      },
    }
  );

  const categoryDivs = await screen.findAllByTestId("jokeRow");
  expect(categoryDivs.length).toBe(2);
  expect(
    within(categoryDivs[0]).getByText(
      /Chuck Norris walked into a bank during a robbery./i
    )
  ).toBeInTheDocument();

  const clearButton = screen.getByRole("button", {
    name: "Clear",
  });
  fireEvent.click(clearButton);

  const categoryDivsAfter = screen.queryAllByTestId("jokeRow");
  expect(categoryDivsAfter.length).toBe(0);
});
