import { useState } from "react";
import { generatePoemTitle } from "../utils/poemUtils";
import { usePoems } from "../hooks/usePoems";
import Poem from "./Poem";
import PoemsFilter from "./PoemsFilter";
import { allPoemGenres, allPoemTopics } from "../utils/poemUtils";
import {
  filterPoemByGenreGenerator,
  filterPoemByTopicGenerator,
  filterPoemByTopicGenerouslyGenerator,
} from "../utils/poemUtils";
import "./Poems.css";

/**
 * Fetches data from server and displays index of poem titles with links and poem content
 */
export default function Poems() {
  const [poems, isLoading] = usePoems();

  if (isLoading) {
    return <Loading />;
  }

  return <PoemsList poems={poems} />;
}

function PoemsList({ poems }: { poems: Poem[] }) {
  const [hiddenGenres, setHiddenGenres] = useState<GenresToRemove>({});
  const [hiddenTopics, setHiddenTopics] = useState<TopicsToRemove>({});
  const [displayGenerously, setDisplayGenerously] = useState(false);
  const topicGenerator = displayGenerously
    ? filterPoemByTopicGenerouslyGenerator
    : filterPoemByTopicGenerator;
  return (
    <>
      <PoemsFilter
        poemGenres={allPoemGenres}
        hiddenGenres={hiddenGenres}
        setHiddenGenres={setHiddenGenres}
        poemTopics={allPoemTopics}
        hiddenTopics={hiddenTopics}
        setHiddenTopics={setHiddenTopics}
        displayGenerously={displayGenerously}
        setDisplayGenerously={setDisplayGenerously}
      />
      <PoemsTitles
        poems={poems}
        hiddenGenres={hiddenGenres}
        hiddenTopics={hiddenTopics}
        displayGenerously={displayGenerously}
      />
      <ul>
        {poems.map((poem) => (
          <Poem
            key={poem.poemId}
            poem={poem}
            display={
              filterPoemByGenreGenerator(hiddenGenres)(poem) &&
              topicGenerator(hiddenTopics)(poem)
            }
          />
        ))}
      </ul>
    </>
  );
}

/** Creates list of poem titles with links to poems */
function PoemsTitles({
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

/** Generic loading component */
function Loading() {
  return (
    <>
      <p>Loading...</p>
    </>
  );
}
