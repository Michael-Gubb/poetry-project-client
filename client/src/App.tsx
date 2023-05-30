import { useState, useEffect } from "react";
import Poem from "./components/Poem";
import "./App.css";

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
  useEffect(() => {
    const poemController = new AbortController();
    const poemSignal = poemController.signal;
    async function fetchPoems(signal: AbortSignal) {
      const response = await fetch(
        "https://wonderful-poems.up.railway.app/api/poems",
        { signal }
      );
      const data = await response.json();
      setPoems(data.poems);
    }
    fetchPoems(poemSignal);
    return () => {
      poemController.abort();
    };
  }, []);

  return (
    <>
      <h1>Poem page</h1>
      <div className="card"></div>
      {poems.map((poem) => (
        <Poem poem={poem} />
      ))}
    </>
  );
}

export default App;
