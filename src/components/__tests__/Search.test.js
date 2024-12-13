import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import AuthProvider from "../AuthProvider";
import Search from "../Search";

const mockResponse = {
  total: 2,
  result: [
    {
      categories: [],
      created_at: "2020-01-05 13:42:24.696555",
      icon_url: "https://api.chucknorris.io/img/avatar/chuck-norris.png",
      id: "tNGiZsC-TlOg9L3L0UXGpA",
      updated_at: "2020-01-05 13:42:24.696555",
      url: "https://api.chucknorris.io/jokes/tNGiZsC-TlOg9L3L0UXGpA",
      value:
        'Before it became politically incorrect, guys used to participate in the sport of "dwarf tossing". Chuck Norris invented and enjoys the sport of gorilla tossing.',
    },
    {
      categories: [],
      created_at: "2020-01-05 13:42:30.730109",
      icon_url: "https://api.chucknorris.io/img/avatar/chuck-norris.png",
      id: "ILP_YtjFTgCqkf0aIyNeMQ",
      updated_at: "2020-01-05 13:42:30.730109",
      url: "https://api.chucknorris.io/jokes/ILP_YtjFTgCqkf0aIyNeMQ",
      value:
        "Chuck Norris makes Happy(the dwarf) be like Grumpy. If you have a \"stay off my lawn\" sign, this does not apply to Chuck Norris. he can stand wherever the hell he wants! If you see a spider in your room, don't freak out. just remember that there is worse. Chuck Norris could be standing in your room with a LARGE knife in his hand. or a bouquet of flowers. the knife makes more sense though..... If Chuck Norris was president, courts wouldn't exist because nobody disobeys Chuck Norris or anything he says/writes down Chuck Norris has never ever missed his target except for that one time.....wait....never mind.... that wasn't Chuck Norris.....never mind.",
    },
  ],
};

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });

  jest.useFakeTimers();
});

it("renders search page", () => {
  renderWithProviders(
    <AuthProvider>
      <Search />
    </AuthProvider>
  );
  const searchSubtitle = screen.getByText(
    /Search results filter out explicit content./i
  );
  expect(searchSubtitle).toBeInTheDocument();
});

it("should return a search result, clicking should open joke", async () => {
  renderWithProviders(
    <AuthProvider>
      <Search />
    </AuthProvider>
  );

  const search = screen.getByLabelText(/search/i);
  fireEvent.change(search, { target: { value: "test" } });
  expect(search.value).toBe("test");

  jest.runAllTimers();
  expect(fetch).toHaveBeenCalledWith(
    `https://api.chucknorris.io/jokes/search?query=test`
  );

  const returnedJokes = await screen.findAllByTestId("searchedJoke");
  expect(returnedJokes.length).toBe(2);

  const text = screen.getByText(
    /Chuck Norris makes Happy\(the dwarf\) be like Grumpy.../i
  );
  const fullTextNotPresent = screen.queryByText(
    /Chuck Norris makes Happy\(the dwarf\) be like Grumpy. If you have a "stay off my lawn" sign, this does not apply to Chuck Norris./i
  );
  expect(text).toBeInTheDocument();
  expect(fullTextNotPresent).toBe(null);
  fireEvent.click(text);
  const fullText = screen.getByText(
    /Chuck Norris makes Happy\(the dwarf\) be like Grumpy. If you have a "stay off my lawn" sign, this does not apply to Chuck Norris./i
  );
  expect(fullText).toBeInTheDocument();
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});
