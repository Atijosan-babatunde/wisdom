// import { useState, useEffect } from 'react';

// function getSessionStorageOrDefault(key, defaultValue) {
//     const stored = sessionStorage.getItem(key);
//     if (!stored) {
//         return defaultValue;
//     }
//     return JSON.parse(stored);
// }

// export function useSessionStorage(key, defaultValue) {
//     const [value, setValue] = useState(
//         getSessionStorageOrDefault(key, defaultValue)
//     );

//     useEffect(() => {
//         sessionStorage.setItem(key, JSON.stringify(value));
//     }, [key, value]);

//     return [value, setValue];
// }

import { useState } from 'react';

export function useSessionStorage(key, initialValue) {
    
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.sessionStorage.getItem(key);
            const valueToReturn = item && item !== null ? typeof item === "object" ? JSON.parse(item) : item : initialValue;
            console.log(key, valueToReturn);
            window.sessionStorage.setItem(key, valueToReturn);
            // Parse stored json or if none return initialValue
            return valueToReturn;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.sessionStorage.setItem(key, typeof valueToStore === "object" ? JSON.stringify(valueToStore) : valueToStore);
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue];
}