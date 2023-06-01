import { useState, useEffect } from "react";
import { generatePoemTitle } from "../utils/poemUtils";
import Poem from "./Poem";
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

  return (
    <>
      <PoemsTitles poems={poems} />
      <ul>
        {poems.map((poem) => (
          <Poem key={poem.poemId} poem={poem} />
        ))}
      </ul>
    </>
  );
}

/** Creates list of poem titles with links to poems */
function PoemsTitles({ poems }: { poems: Poem[] }) {
  return (
    <ul>
      {poems.map((poem) => {
        return (
          <li key={"linkto" + poem.poemId}>
            <a href={"#" + poem.poemId}>{generatePoemTitle(poem) + "     "}</a>
          </li>
        );
      })}
    </ul>
  );
}

function Loading() {
  return (
    <>
      <p>Loading...</p>
    </>
  );
}
