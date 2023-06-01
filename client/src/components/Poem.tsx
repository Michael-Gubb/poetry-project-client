import "./Poem.css";

export default function Poem({ poem: poem }: { poem: Poem }) {
  return (
    <li key={poem.poemId} id={poem.poemId}>
      <p>
        ----------------
        <br />
      </p>
      <h2>{generatePoemTitle(poem)}</h2>
      <p className={"poemText"}>{poem.poemText}</p>
      <p>
        ---------------
        <br />
      </p>
    </li>
  );
}

function generatePoemTitle(poem: Poem) {
  return `${poem.poemGenre} for ${poem.poemTopics[0]}, ${poem.poemTopics[1]} and ${poem.poemTopics[2]}`;
}
