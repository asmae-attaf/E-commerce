// Import du hook useEffect depuis React
import { useEffect } from 'react';

// Définition du hook useOutsideClose
const useOutsideClose = (ref, handler) => {

    // Utilisation du hook useEffect pour gérer les événements lorsqu'un clic en dehors de l'élément référencé se produit
    useEffect(() => {
        // Fonction qui sera exécutée lorsqu'un clic en dehors de l'élément référencé se produit
        const outsideClose = (e) => {
            // Vérifie si l'élément référencé existe et si le clic n'est pas à l'intérieur de cet élément
            if (ref.current && !ref.current.contains(e.target)) {
                // Appelle la fonction de gestion spécifiée pour fermer quelque chose (par exemple, un formulaire)
                handler();
            }
        };

        // Ajoute un écouteur d'événements pour détecter les clics à l'extérieur de l'élément référencé
        window.addEventListener('mousedown', outsideClose);

        // Nettoie les écouteurs d'événements lors du démontage du composant ou de la mise à jour de la référence ou du gestionnaire
        return () => {
            window.removeEventListener('mousedown', outsideClose);
        };
    }, [ref, handler]); // Déclenche l'effet lorsque la référence ou le gestionnaire change

};

// Exportation du hook useOutsideClose
export default useOutsideClose;
