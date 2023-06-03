/** Use to generate standard poem title */
export function generatePoemTitle(poem: Poem) {
  return `${poem.poemGenre} for ${poem.poemTopics[0]}, ${poem.poemTopics[1]} and ${poem.poemTopics[2]}`;
}

interface GenresToRemove {
  [index: string]: boolean;
}

/** Generates a function to filter poems by genre*/
export function filterPoemByGenreGenerator(genresToRemove: GenresToRemove) {
  const genresSet = new Set();
  for (const genre in genresToRemove) {
    genresSet.add(genre);
  }
  /** Returns false for any poems with provided genres */
  function filterPoemByGenre(poem: Poem) {
    if (genresSet.has(poem.poemGenre)) {
      return false;
    } else {
      return true;
    }
  }
  return filterPoemByGenre;
}

interface TopicsToRemove {
  [index: string]: boolean;
}
/** Generates a function to filter poems by topic*/
export function filterPoemByTopicGenerator(topicsToRemove: TopicsToRemove) {
  const topicsSet = new Set();
  for (const topic in topicsToRemove) {
    topicsSet.add(topic);
  }
  /** Returns false for any poems with provided topics */
  function filterPoemByTopic(poem: Poem) {
    for (const topic of poem.poemTopics) {
      if (topicsSet.has(topic)) {
        return false;
      }
    }
    {
      return true;
    }
  }
  return filterPoemByTopic;
}
