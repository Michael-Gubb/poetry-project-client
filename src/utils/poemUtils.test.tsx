import { test, expect } from "vitest";
import {
  filterPoemByGenreGenerator,
  filterPoemByTopicGenerator,
} from "./poemUtils";

test("filterPoemByGenreGenerator returns a function that passes a poem that does not match input", () => {
  const genresToRemove = { poem: true, eulogy: true, limerick: false };

  const showPoem = filterPoemByGenreGenerator(genresToRemove);

  const inputPoem: Poem = {
    poemGenre: "limerick",
    poemId: "1",
    poemDate: "1",
    poemTopics: ["Fish", "Cats", "Hats"],
    poemText: "hello",
    poemImg: "",
  };

  expect(showPoem(inputPoem)).toBe(true);
});

test("filterPoemByGenreGenerator returns a function that fails a poem that matches input", () => {
  const genresToRemove = { poem: true, eulogy: true, limerick: false };

  const showPoem = filterPoemByGenreGenerator(genresToRemove);

  /** Poem that has genre in topicsToRemove */
  const inputPoem: Poem = {
    poemGenre: "poem",
    poemId: "1",
    poemDate: "1",
    poemTopics: ["Fish", "Cats", "Hats"],
    poemText: "hello",
    poemImg: "",
  };

  expect(showPoem(inputPoem)).toBe(false);
});

test("filterPoemByTopicGenerator returns a function that passes a poem that does not match input", () => {
  const topicsToRemove = { Dog: true, Fish: false, Cats: false, Hats: false };

  const showPoem = filterPoemByTopicGenerator(topicsToRemove);

  /** Poem that does not have topic in topicsToRemove */
  const inputPoem: Poem = {
    poemGenre: "poem",
    poemId: "1",
    poemDate: "1",
    poemTopics: ["Fish", "Cats", "Hats"],
    poemText: "hello",
    poemImg: "",
  };

  expect(showPoem(inputPoem)).toBe(true);
});

test("filterPoemByGenreGenerator returns a function that fails a poem that matches input", () => {
  const topicsToRemove = { Dog: true, Fish: true, Cats: false, Hats: false };

  const showPoem = filterPoemByTopicGenerator(topicsToRemove);

  /** Poem that has topic in topicsToRemove */
  const inputPoem: Poem = {
    poemGenre: "poem",
    poemId: "1",
    poemDate: "1",
    poemTopics: ["Fish", "Cats", "Hats"],
    poemText: "hello",
    poemImg: "",
  };

  expect(showPoem(inputPoem)).toBe(false);
});
