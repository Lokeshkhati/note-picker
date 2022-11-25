import { useState, useEffect, } from "react";
const useLocalStorage = (key, initialValue) => {

    const [state, setState] = useState(() => {

        try {

            const value = localStorage.getItem(key)
            return value ? JSON.parse(value) : initialValue

        }
        catch (err) {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))

    }, [key, state])

    return [state, setState];
};

export default useLocalStorage;
