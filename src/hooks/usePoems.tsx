import { useState, useEffect } from "react";

const envServerURL: string | undefined = import.meta.env.VITE_SERVER_URL;
const serverURL = envServerURL ? envServerURL : "http://localhost:3333";
const poemsPath = `/api/poems`;
const localstoragePoemsKey = "poemsStorage";

/** Returns poems and loading state, fetches poems if not already in local storage */
export function usePoems(): [Poem[], boolean] {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const poemController = new AbortController();
    const poemSignal = poemController.signal;
    async function fetchPoems(signal: AbortSignal) {
      const response = await fetch(serverURL + poemsPath, { signal });
      const data: GetPoems = await response.json();
      setPoems(data.poems);
      setIsLoading(false);
      localStorage.setItem(localstoragePoemsKey, JSON.stringify(data.poems));
    }
    const savedPoems = localStorage.getItem(localstoragePoemsKey);
    if (savedPoems !== null) {
      //should validate data here
      setPoems(JSON.parse(savedPoems));
      setIsLoading(false);
    } else {
      fetchPoems(poemSignal);
    }

    return () => {
      poemController.abort();
    };
  }, []);

  return [poems, isLoading];
}
