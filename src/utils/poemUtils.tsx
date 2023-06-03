/** Use to generate standard poem title */
export function generatePoemTitle(poem: Poem) {
  return `${poem.poemGenre} for ${poem.poemTopics[0]}, ${poem.poemTopics[1]} and ${poem.poemTopics[2]}`;
}

interface GenresToRemove {
  [index: string]: boolean;
}

/** Generates a function to filter poems*/
export function filterPoemByGenreGenerator(genresToRemove: GenresToRemove) {
  const genresSet = new Set();
  for (const genre in genresToRemove) {
    genresSet.add(genre);
  }
  /** Returns false for any peoms with provivded genres  */
  function filterPoemByGenre(poem: Poem) {
    if (genresSet.has(poem.poemGenre)) {
      return false;
    } else {
      return true;
    }
  }

  return filterPoemByGenre;
}
