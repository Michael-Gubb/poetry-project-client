export default function Poem({ poem: poem }: { poem: Poem }) {
  return (
    <li key={poem.poemId} id={poem.poemId}>
      <p>
        ----------------
        <br />
      </p>
      <h2>{`${poem.poemGenre} for ${poem.poemTopics[0]},${poem.poemTopics[1]} and ${poem.poemTopics[2]}`}</h2>
      {poem.poemText.split("\n").map((part) => {
        return <p>{part}</p>;
      })}
      <p>
        ---------------
        <br />
      </p>
    </li>
  );
}
