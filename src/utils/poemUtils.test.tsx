import { test, expect } from "vitest";
import {
  filterPoemByGenreGenerator,
  filterPoemByTopicGenerator,
} from "./poemUtils";

test("filterPoemByGenreGenerator returns a function that passes a poem that does not match input", () => {
  const genresToRemove = { poem: true, eulogy: true };

  const showPoem = filterPoemByGenreGenerator(genresToRemove);

  const inputPoem: Poem = {
    poemGenre: "fish",
    poemId: "1",
    poemDate: "1",
    poemTopics: ["hello"],
    poemText: "hello",
    poemImg: "",
  };

  expect(showPoem(inputPoem)).toBe(true);
});

test("filterPoemByGenreGenerator returns a function that fails a poem that matches input", () => {
  const genresToRemove = { poem: true, eulogy: true };

  const showPoem = filterPoemByGenreGenerator(genresToRemove);

  const inputPoem: Poem = {
    poemGenre: "poem",
    poemId: "1",
    poemDate: "1",
    poemTopics: ["dog"],
    poemText: "hello",
    poemImg: "",
  };

  expect(showPoem(inputPoem)).toBe(false);
});

test("filterPoemByTopicGenerator returns a function that passes a poem that does not match input", () => {
  const topicsToRemove = { dog: true, fish: true };

  const showPoem = filterPoemByTopicGenerator(topicsToRemove);

  const inputPoem: Poem = {
    poemGenre: "poem",
    poemId: "1",
    poemDate: "1",
    poemTopics: ["hello", "goodbye"],
    poemText: "hello",
    poemImg: "",
  };

  expect(showPoem(inputPoem)).toBe(true);
});

test("filterPoemByGenreGenerator returns a function that fails a poem that matches input", () => {
  const topicsToRemove = { dog: true, fish: true };

  const showPoem = filterPoemByTopicGenerator(topicsToRemove);

  const inputPoem: Poem = {
    poemGenre: "poem",
    poemId: "1",
    poemDate: "1",
    poemTopics: ["hello", "fish"],
    poemText: "hello",
    poemImg: "",
  };

  expect(showPoem(inputPoem)).toBe(false);
});
