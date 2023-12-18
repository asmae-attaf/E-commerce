// Importation des dépendances nécessaires depuis React et des icônes React
import React, { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';

// Composant fonctionnel représentant le bouton "Back to Top"
const BackTop = () => {
    // Utilisation du state pour gérer la visibilité du bouton "Back to Top"
    const [isVisible, setIsVisible] = useState(false);

    // Effet qui gère la visibilité du bouton en fonction du défilement de la page
    useEffect(() => {
        // Fonction de gestion du défilement
        const handleScroll = () => window.scrollY >= 800 ? setIsVisible(true) : setIsVisible(false);

        // Ajout d'un écouteur d'événement pour le défilement
        window.addEventListener('scroll', handleScroll);

        // Nettoyage de l'écouteur d'événement lorsque le composant est démonté
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // La dépendance vide assure que cet effet n'est exécuté qu'une seule fois lors du montage du composant

    // Fonctionnalité pour remonter en haut de la page
    const handleBackTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Fait défiler en douceur
        });
    };

    // Rendu du composant
    return (
        <>
            <div
                className={`back_top ${isVisible ? 'popped' : ''}`}
                title="Back to top"
                onClick={handleBackTop}>
                <FaChevronUp />
            </div>
        </>
    );
};

// Exportation du composant BackTop en tant que composant par défaut
export default BackTop;
