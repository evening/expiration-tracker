import React from "react";

function useStickyState<T>(key: string) {
    const [entries, setEntries] = React.useState<T>(() => {
        const stickyValue = window.localStorage.getItem(key);
        return stickyValue !== null ? JSON.parse(stickyValue) : [];
    });
    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(entries));
    }, [key, entries]);
    return { entries, setEntries };
}
export default useStickyState;
