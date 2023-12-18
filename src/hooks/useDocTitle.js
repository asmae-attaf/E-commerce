import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} - Fashi`;
        } else {
            document.title = 'Fashi | La boutique parfaite';
        }
    }, [title]);

    return null;
};

export default useDocTitle;
