import { useState, useEffect } from "react";

const envServerURL: string | undefined = import.meta.env.VITE_SERVER_URL;
const serverURL = envServerURL ? envServerURL : "http://localhost:3333";
const poemsPath = `/api/poems`;
const localstoragePoemsKey = "poemsStorage";

/** Returns poems, loading state and error state, fetches poems if not already in local storage
 */
export function usePoems(): [Poem[], boolean, boolean, MorePoems] {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  useEffect(() => {
    const poemController = new AbortController();
    const poemSignal = poemController.signal;
    async function fetchPoems(signal: AbortSignal) {
      try {
        const response = await fetch(serverURL + poemsPath, { signal });
        const data: GetPoems = await response.json();
        //should validate data here
        setPoems(data.poems);
        setIsLoading(false);
        localStorage.setItem(localstoragePoemsKey, JSON.stringify(data.poems));
      } catch (err) {
        console.error(err);
        setLoadingError(true);
      }
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

  const numberOfPoems = poems.length;

  /**
   *
   * @param morePoems
   * @returns
   */
  function getMorePeoms(morePoems = 50) {
    const poemController = new AbortController();
    const poemSignal = poemController.signal;
    const poemsLimit = `?limit=${numberOfPoems + morePoems}`;
    async function fetchPoems(signal: AbortSignal) {
      try {
        const response = await fetch(serverURL + poemsPath + poemsLimit, {
          signal,
        });
        const data: GetPoems = await response.json();
        //should validate data here
        setPoems(data.poems);
        setIsLoading(false);
        localStorage.setItem(localstoragePoemsKey, JSON.stringify(data.poems));
      } catch (err) {
        console.error(err);
        setLoadingError(true);
      }
    }

    fetchPoems(poemSignal);

    return;
  }

  return [poems, isLoading, loadingError, getMorePeoms];
}
