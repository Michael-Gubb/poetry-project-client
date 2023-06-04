import { test, vi, expect, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import Poems from "./Poems";

expect.extend(matchers);

const mockResponse: GetPoems = {
  poems: [
    {
      poemText: "hello 123",
      poemId: "1",
      poemDate: "day1",
      poemGenre: "poem",
      poemTopics: ["Dogs", "Cats", "Fish"],
      poemImg: "",
    },
    {
      poemText: "goodbye 456",
      poemId: "2",
      poemDate: "day2",
      poemGenre: "eulogy",
      poemTopics: ["Dogs", "Cats", "Hats"],
      poemImg: "",
    },
  ],
};

global.fetch = vi
  .fn()
  .mockImplementation(() => Promise.resolve({ json: () => mockResponse }));

afterEach(() => {
  cleanup();
});

test("Poems fetches data and displays poems", () => {
  render(<Poems />);
});
