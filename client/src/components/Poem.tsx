export default function Poem({ poem: poem }: { poem: Poem }) {
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
}
