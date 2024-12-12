import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import Jokes from "../Jokes";
import AuthProvider from "../AuthProvider";

it("renders joke page", async () => {
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
