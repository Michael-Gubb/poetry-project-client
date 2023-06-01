import { useState, useEffect } from "react";
import Poem from "./Poem";

const envServerURL: string | undefined = import.meta.env.VITE_SERVER_URL;
const serverURL = envServerURL ? envServerURL : "http://localhost:3333";
const poemsPath = `/api/poems`;

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
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <ul>
        {poems.map((poem) => (
          <Poem key={poem.poemId} poem={poem} />
        ))}
      </ul>
    </>
  );
}
