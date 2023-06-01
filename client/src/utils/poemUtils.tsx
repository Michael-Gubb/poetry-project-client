/** Use to generate standard poem title */
export function generatePoemTitle(poem: Poem) {
  return `${poem.poemGenre} for ${poem.poemTopics[0]}, ${poem.poemTopics[1]} and ${poem.poemTopics[2]}`;
}
