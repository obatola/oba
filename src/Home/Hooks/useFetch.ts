import {useEffect, useState} from 'react';

export interface IUseFetchBundle<T> {
    response: T | null;
    error: string | null;
    isLoading: boolean;
    doFetch: () => void;
}

export const useFetch = <T>(url: string, options?: RequestInit): IUseFetchBundle<T> => {
    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoadingState] = useState<boolean>(false);

    let abortController: AbortController;
    let signal: AbortSignal;

    const doFetch = async () => {
        try {
            setLoadingState(true);
            const response = await fetch(url, options);

            if (response.ok) {
                const json: T = await response.json();
                
                if (!signal.aborted) {
                    setResponse(json);
                }
            }
        } catch (e: any) {
            if (!signal.aborted) {
                setError(e as string);
            }
        } finally {
            if (!signal.aborted) {
                setLoadingState(false);
            }
        }
    }

    useEffect(() => {
        abortController = new AbortController();
        signal = abortController.signal;

        return () => {
            abortController.abort()
        };
    }, [])

    return {response, error, isLoading, doFetch};
}