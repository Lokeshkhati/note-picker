import { useEffect } from 'react';
const useClickOutside = (ref, callback) => {
    const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            callback();
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleClick);
        document.addEventListener('touchstart', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('touchstart', handleClick);
        };
    });
};

export default useClickOutside
