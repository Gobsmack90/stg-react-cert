import { fireEvent, getByRole, screen } from "@testing-library/react";
import JokeModal from "../JokeModal";
import { renderWithProviders } from "../../utils/test-utils";

const mockResponse = {
  categories: ["history"],
  created_at: "2020-01-05 13:42:19.576875",
  icon_url: "https://api.chucknorris.io/img/avatar/chuck-norris.png",
  id: "vxmg5zgusq6ra35ns4e5sw",
  updated_at: "2020-01-05 13:42:19.576875",
  url: "https://api.chucknorris.io/jokes/vxmg5zgusq6ra35ns4e5sw",
  value:
    "After returning from World War 2 unscrathed, Bob Dole was congratulated by Chuck Norris with a handshake. The rest is history.",
};

beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse),
  });
});

it("renders modal", async () => {
  renderWithProviders(
    <JokeModal category={"history"} setCategory={() => null} />
  );
  const heading = await screen.findByText(/history/i);
  expect(heading).toBeInTheDocument();
});

it("should fetch a new joke", async () => {
  renderWithProviders(
    <JokeModal category={"history"} setCategory={() => null} />
  );

  expect(fetch).toHaveBeenCalledWith(
    `https://api.chucknorris.io/jokes/random?category=history`
  );

  const joke = await screen.findByText(
    /After returning from World War 2 unscrathed/i
  );
  expect(joke).toBeInTheDocument();
  const newJoke = screen.getByRole("button", { name: "New Joke" });
  expect(newJoke).toBeInTheDocument();
  fireEvent.click(newJoke);
  const joke2 = await screen.findByText(
    /After returning from World War 2 unscrathed/i
  );
  expect(joke2).toBeInTheDocument();
});

afterEach(() => {
  jest.restoreAllMocks();
});
