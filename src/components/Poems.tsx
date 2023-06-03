import { useState, useEffect } from "react";
import { generatePoemTitle } from "../utils/poemUtils";
import Poem from "./Poem";
import PoemsFilter from "./PoemsFilter";
import { allPoemGenres, allPoemTopics } from "../utils/poemUtils";
import {
  filterPoemByGenreGenerator,
  filterPoemByTopicGenerator,
} from "../utils/poemUtils";
import "./Poems.css";

const envServerURL: string | undefined = import.meta.env.VITE_SERVER_URL;
const serverURL = envServerURL ? envServerURL : "http://localhost:3333";
const poemsPath = `/api/poems`;
/**
 * Fetches data from server and displays index of poem titles with links and poem content
 */
export default function Poems() {
  const [poems, setPoems] = useState<Poem[]>([
    {
      poemText: "placeholder",
      poemId: "5",
      poemTopics: ["Dog", "Cat", "Fish"],
      poemDate: "",
      poemGenre: "",
      poemImg: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const poemController = new AbortController();
    const poemSignal = poemController.signal;
    async function fetchPoems(signal: AbortSignal) {
      const response = await fetch(serverURL + poemsPath, { signal });
      const data = await response.json();
      setPoems(data.poems);
      setIsLoading(false);
    }
    fetchPoems(poemSignal);
    return () => {
      poemController.abort();
    };
  }, []);
  if (isLoading) {
    return <Loading />;
  }

  return <PoemsList poems={poems} />;
}

function PoemsList({ poems }: { poems: Poem[] }) {
  const [hiddenGenres, setHiddenGenres] = useState<GenresToRemove>({});
  const [hiddenTopics, setHiddenTopics] = useState<TopicsToRemove>({});
  return (
    <>
      <PoemsFilter
        poemGenres={allPoemGenres}
        hiddenGenres={hiddenGenres}
        setHiddenGenres={setHiddenGenres}
        poemTopics={allPoemTopics}
        hiddenTopics={hiddenTopics}
        setHiddenTopics={setHiddenTopics}
      />
      <PoemsTitles
        poems={poems}
        hiddenGenres={hiddenGenres}
        hiddenTopics={hiddenTopics}
      />
      <ul>
        {poems.map((poem) => (
          <Poem
            key={poem.poemId}
            poem={poem}
            display={
              filterPoemByGenreGenerator(hiddenGenres)(poem) &&
              filterPoemByTopicGenerator(hiddenTopics)(poem)
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
}: {
  poems: Poem[];
  hiddenGenres: GenresToRemove;
  hiddenTopics: TopicsToRemove;
}) {
  const [closed, setClosed] = useState(true);
  function handleShow() {
    setClosed((v) => {
      return !v;
    });
  }
  const cssDisplay = closed ? { display: "none" } : {};
  return (
    <div>
      <button onClick={handleShow}>
        {closed ? "Show Poems index" : "Hide Poems index"}
      </button>
      <ul style={cssDisplay}>
        {poems.map((poem) => {
          return (
            <li
              key={"linkto" + poem.poemId}
              style={
                filterPoemByGenreGenerator(hiddenGenres)(poem) &&
                filterPoemByTopicGenerator(hiddenTopics)(poem)
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
