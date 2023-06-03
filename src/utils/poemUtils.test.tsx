import { test, expect } from "vitest";
import { filterPoemByGenreGenerator } from "./poemUtils";

test("filterPoemByGenreGenerator returns a function that passes a poem that does not match input", () => {
  const genresToRemove = { poem: true, eulogy: true };

  const filter = filterPoemByGenreGenerator(genresToRemove);

  const inputPoem: Poem = {
    poemGenre: "fish",
    poemId: "1",
    poemDate: "1",
    poemTopics: ["hello"],
    poemText: "hello",
    poemImg: "",
  };
  expect(filter(inputPoem)).toBe(true);
});

test("filterPoemByGenreGenerator returns a function that fails a poem that matches input", () => {
  const genresToRemove = { poem: true, eulogy: true };

  const filter = filterPoemByGenreGenerator(genresToRemove);

  const inputPoem: Poem = {
    poemGenre: "poem",
    poemId: "1",
    poemDate: "1",
    poemTopics: ["dog"],
    poemText: "hello",
    poemImg: "",
  };
  expect(filter(inputPoem)).toBe(false);
});
