import { useState, useEffect } from "react";
import Poem from "./components/Poem";
import "./App.css";

const serverURL: string = import.meta.env.VITE_SERVER_URL;

function App() {
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
      const response = await fetch(serverURL, { signal });
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
        <h1>Poem page</h1>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <h1>Poem page</h1>
      <ul>
        {poems.map((poem) => (
          <Poem key={poem.poemId} poem={poem} />
        ))}
      </ul>
    </>
  );
}

export default App;
