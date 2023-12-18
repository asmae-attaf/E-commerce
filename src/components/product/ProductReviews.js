import React from 'react';
import { IoMdStar } from 'react-icons/io';

// Composant ProductReviews représentant un avis de produit
const ProductReviews = (props) => {

    // Destructuration des propriétés de l'avis
    const { name, date, review, rateCount } = props;

    // Rendu du composant
    return (
        <>
            <li>
                {/* Section d'informations sur l'utilisateur */}
                <div className="user_info">
                    {/* Image de profil de l'utilisateur */}
 <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt="user-img" />
                    <div>
                        {/* Nom de l'utilisateur */}
                        <h4>{name}</h4>
                        {/* Section des évaluations de l'utilisateur */}
                        <div className="user_ratings">
                            {/* Affichage des étoiles de notation basé sur le nombre d'étoiles donné */}
                            <span className="rating_star">
                                {
                                    [...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)
                                }
                            </span>
                            <span>|</span>
                            {/* Date de l'avis */}
                            <span className="date">{date}</span>
                        </div>
                    </div>
                </div>
                {/* Paragraphe de l'avis de l'utilisateur */}
                <p className="user_review">{review}</p>
            </li>
        </>
    );
};

// Exportation du composant ProductReviews
export default ProductReviews;
