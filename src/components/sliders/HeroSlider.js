// Import des dépendances nécessaires depuis les bibliothèques et les fichiers locaux.
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper'; // Importation des modules Swiper nécessaires
import 'swiper/scss'; // Styles généraux de Swiper
import 'swiper/scss/autoplay'; // Styles spécifiques pour l'autoplay
import 'swiper/scss/pagination'; // Styles spécifiques pour la pagination
import { displayMoney } from '../../helpers/utils'; // Fonction utilitaire pour formater l'affichage de l'argent
import productsData from '../../data/productsData'; // Données locales des produits

// Options de configuration pour Swiper extraites en tant que constantes pour la clarté.
const SWIPER_OPTIONS = {
    modules: [Pagination, A11y, Autoplay],
    loop: true,
    speed: 400,
    spaceBetween: 100,
    slidesPerView: 1,
    pagination: { clickable: true },
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
};

// Composant principal pour le slider des produits héroïques.
const HeroSlider = () => {
    // Filtrer les produits qui ont le tag 'hero-product'.
    const heroProducts = productsData.filter(item => item.tag === 'Slide'); // Remarque : il pourrait y avoir une faute de frappe dans le tag 'T-shirsts'. Assurez-vous que c'est le bon tag.

    return (
        // Utilisation du composant Swiper avec les options configurées.
        <Swiper {...SWIPER_OPTIONS}>
            {/* Boucle à travers les produits héroïques et génère des diapositives Swiper pour chacun. */}
            {heroProducts.map((item, index) => {
                // Extraction des données nécessaires de chaque produit.
                const { id, title, tagline, heroImage, finalPrice, originalPrice, path } = item;
                const newPrice = displayMoney(finalPrice);
                const oldPrice = displayMoney(originalPrice);

                // Rendu de chaque diapositive du slider.
                return (
                    <SwiperSlide key={id} className={`wrapper hero_wrapper hero_slide-${index}`}>
                        <div className="hero_item_txt">
                            <h3>{title}</h3>
                            <h1>{tagline}</h1>
                            <h2 className="hero_price">
                                {newPrice} &nbsp;
                                <small><del>{oldPrice}</del></small>
                            </h2>
                            <Link to={`${path}${id}`} className="btn">Acheter maintenant</Link>
                        </div>
                        <figure className="hero_item_img">
                            <img src={heroImage} alt="product-img" />
                        </figure>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

// Export du composant HeroSlider pour pouvoir l'utiliser ailleurs dans l'application.
export default HeroSlider;
