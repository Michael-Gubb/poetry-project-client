/** Use to generate standard poem title */
export function generatePoemTitle(poem: Poem) {
  return `${poem.poemGenre} for ${poem.poemTopics[0]}, ${poem.poemTopics[1]} and ${poem.poemTopics[2]}`;
}

/** Generates a function to filter poems by genre*/
export function filterPoemByGenreGenerator(genresToRemove: GenresToRemove) {
  const genresSet = new Set();
  for (const genre in genresToRemove) {
    if (genresToRemove[genre]) genresSet.add(genre);
  }
  /** Display a poem based on its genre */
  function showPoemByGenre(poem: Poem) {
    if (genresSet.has(poem.poemGenre)) {
      return false;
    } else {
      return true;
    }
  }
  return showPoemByGenre;
}

type TopicsToRemove = {
  [index: string]: boolean;
};
/** Generates a function to filter poems by topic*/
export function filterPoemByTopicGenerator(topicsToRemove: TopicsToRemove) {
  const topicsSet = new Set();
  for (const topic in topicsToRemove) {
    if (topicsToRemove[topic]) topicsSet.add(topic);
  }
  /** Display a poem based on its topic */
  function showPoemByTopic(poem: Poem) {
    for (const topic of poem.poemTopics) {
      if (topicsSet.has(topic)) {
        return false;
      }
    }
    {
      return true;
    }
  }
  return showPoemByTopic;
}

/**
 * List of poem topics to select 3 topics from (copied from server)
 */
export const allPoemTopics = [
  "Dogs",
  "Cats",
  "Fish",
  "Fruit",
  "Balls",
  "Bowls",
  "Oranges",
  "Hats",
  "Shoes",
  "Trees",
  "Auckland",
  "Wellington",
  "Whangarei",
  "Clouds",
  "Rain",
  "Sunshine",
  "Lemurs",
  "Capybaras",
  "Spotted Sandpipers",
  "Kiwi",
  "Kea",
  "Automobiles",
  "Rats",
  "Mice",
  "Noodles",
  "Horses",
  "Chickens",
  "Guinea Fowl",
  "Ducks",
  "Geese",
  "New Zealand",
  "Australia",
  "Te Awamutu",
  "Mount Cook",
];

/**
 * List of poem genres
 */
export const allPoemGenres = [
  "poem",
  "eulogy",
  "sonnet",
  "haiku",
  "limerick",
  "ballad",
  "elegy",
];
