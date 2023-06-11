import { useState, useEffect } from "react";

const envServerURL: string | undefined = import.meta.env.VITE_SERVER_URL;
const serverURL = envServerURL ? envServerURL : "http://localhost:3333";
const poemsPath = `/api/poems`;

export function usePoems(): [Poem[], boolean] {
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
      const data: GetPoems = await response.json();
      setPoems(data.poems);
      setIsLoading(false);
    }
    fetchPoems(poemSignal);
    return () => {
      poemController.abort();
    };
  }, []);

  return [poems, isLoading];
}
