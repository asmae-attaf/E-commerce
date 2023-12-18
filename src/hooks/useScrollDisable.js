// Import du hook useEffect depuis React
import { useEffect } from 'react';

// Définition du hook useScrollDisable
const useScrollDisable = (elem) => {

    // Utilisation du hook useEffect pour gérer la désactivation/activation du défilement en fonction de la présence de l'élément
    useEffect(() => {
        // Ajoute ou supprime la classe CSS 'overflow_hide' du corps du document en fonction de la présence de l'élément
        elem ? document.body.classList.add('overflow_hide') : document.body.classList.remove('overflow_hide');

        // Nettoie les modifications lors du démontage du composant ou en cas de changement de l'élément
        return () => {
            document.body.classList.remove('overflow_hide');
        };
    }, [elem]); // Déclenche l'effet lorsque l'élément change

};

// Exportation du hook useScrollDisable
export default useScrollDisable;
