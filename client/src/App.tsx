import { useState } from "react";
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

  async function fetchPoems() {
    const response = await fetch("http://localhost:3333/poems");
    const data = await response.json();
    console.log(data);

    setPoems(data.poems);
  }

  return (
    <>
      <h1>Poem page</h1>
      <div className="card">
        <button onClick={fetchPoems}>my button</button>
      </div>
      {poems.map((poem) => {
        return (
          <div key={poem.poemId}>
            <p>
              ----------------<br></br>
            </p>
            <p>{poem.poemText}</p>
            <p>
              ---------------<br></br>
            </p>
          </div>
        );
      })}
    </>
  );
}

export default App;
