import { useState, useEffect } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setError(null);
            setIsPending(true);

            try {
                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const json = await res.json();
                
                setIsPending(false);
                setData(json);
                setError(null);
            } catch (err) {
                if (err.name === "AbortError") {
                    setIsPending(false)
                    setError("The fetch was aborted")
                } else if (err.name === "SyntaxError") {
                    setIsPending(false)
                    setError("Write the book's name to search")
                }
                else {
                    setIsPending(false);
                    setError("Could not fetch the data");
                }
            }
        }

        fetchData();

        return () => {
            controller.abort();
        }

    }, [url])

    return { data, isPending, error }

}