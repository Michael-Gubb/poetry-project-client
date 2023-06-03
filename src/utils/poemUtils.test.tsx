import { test, expect } from "vitest";
import {
  filterPoemByGenreGenerator,
  filterPoemByTopicGenerator,
  filterPoemByTopicGenerouslyGenerator,
} from "./poemUtils";

test("filterPoemByGenreGenerator returns a function that passes a poem that does not match input", () => {
  const genresToRemove = { poem: true, eulogy: true, limerick: false };

  const showPoem = filterPoemByGenreGenerator(genresToRemove);

  /** Poem that does not has genre in genresToRemove */
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

test("filterPoemByGenreGenerator returns a function that fails a poem that matches genred to be removed", () => {
  const genresToRemove = { poem: true, eulogy: true, limerick: false };

  const showPoem = filterPoemByGenreGenerator(genresToRemove);

  /** Poem that has genre in genresToRemove */
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

test("filterPoemByTopicGenerator returns a function that passes a poem that does not have a topic to be filtered", () => {
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

test("filterPoemByGenreGenerator returns a function that fails a poem that matches at least one topic to be filtered", () => {
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

test("filterPoemByTopicGenerouslyGenerator returns a function that passes a poem that has no topics to be filtered", () => {
  const topicsToRemove = { Dog: true, Fish: false, Cats: false, Hats: false };

  const showPoem = filterPoemByTopicGenerouslyGenerator(topicsToRemove);

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

test("filterPoemByTopicGenerouslyGenerator returns a function that passes a poem that has 1 topics to be filtered", () => {
  const topicsToRemove = { Dog: true, Fish: true, Cats: false, Hats: false };

  const showPoem = filterPoemByTopicGenerouslyGenerator(topicsToRemove);

  /** Poem that has 1 topic in topicsToRemove */
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

test("filterPoemByTopicGenerouslyGenerator returns a function that passes a poem that has 2 topics to be filtered", () => {
  const topicsToRemove = { Dog: true, Fish: true, Cats: true, Hats: false };

  const showPoem = filterPoemByTopicGenerouslyGenerator(topicsToRemove);

  /** Poem that has 2 topics in topicsToRemove  */
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

test("filterPoemByGenreGeneratorGeneriously returns a function that fails a poem that has all of its topics to be filtered", () => {
  const topicsToRemove = { Dog: true, Fish: true, Cats: true, Hats: true };

  const showPoem = filterPoemByTopicGenerouslyGenerator(topicsToRemove);

  /** Poem that has 3 topics in topicsToRemove */
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
