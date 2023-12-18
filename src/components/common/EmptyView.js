// Importation de React et du composant Link depuis react-router-dom
import React from 'react';
import { Link } from 'react-router-dom';
// Composant fonctionnel représentant une vue vide
const EmptyView = (props) => {
    // Extraction des propriétés nécessaires de l'objet props
    const { icon, msg, link, btnText } = props;

    // Rendu du composant
    return (
        <>
            <div className="empty_view_wrapper">
                {/* Affichage de l'icône fournie en tant que propriété */}
                <div className="empty_view_icon">
                    {icon}
                </div>
                {/* Affichage du message fourni en tant que propriété */}
                <h2>{msg}</h2>
                {/* Conditionnelle pour afficher le lien et le bouton seulement si la propriété link est fournie */}
                {
                    link && (
                        <Link to={link} className="btn">
                            {btnText}
                        </Link>
                    )
                }
            </div>
        </>
    );
};

// Exportation du composant EmptyView en tant que composant par défaut
export default EmptyView;
