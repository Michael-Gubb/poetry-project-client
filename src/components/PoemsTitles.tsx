import { useState } from "react";
import {
  generatePoemTitle,
  filterPoemByGenreGenerator,
  filterPoemByTopicGenerator,
  filterPoemByTopicGenerouslyGenerator,
} from "../utils/poemUtils";

/** Creates list of poem titles with links to poems */
export default function PoemsTitles({
  poems,
  hiddenGenres,
  hiddenTopics,
  displayGenerously,
}: {
  poems: Poem[];
  hiddenGenres: GenresToRemove;
  hiddenTopics: TopicsToRemove;
  displayGenerously: boolean;
}) {
  const [closed, setClosed] = useState(true);
  function handleShow() {
    setClosed((v) => {
      return !v;
    });
  }
  const topicGenerator = displayGenerously
    ? filterPoemByTopicGenerouslyGenerator
    : filterPoemByTopicGenerator;
  return (
    <div>
      <button onClick={handleShow}>
        {closed ? "Show Poems index" : "Hide Poems index"}
      </button>
      <ul className={closed ? "hidden" : ""}>
        {poems.map((poem) => {
          return (
            <li
              key={"linkto" + poem.poemId}
              style={
                filterPoemByGenreGenerator(hiddenGenres)(poem) &&
                topicGenerator(hiddenTopics)(poem)
                  ? { display: "list-item" }
                  : { display: "none" }
              }
            >
              <a href={"#" + poem.poemId}>
                {generatePoemTitle(poem) + "     "}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
