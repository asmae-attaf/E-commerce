import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, A11y, Autoplay } from 'swiper'; // Importation des modules Swiper nécessaires
import { displayMoney } from '../../helpers/utils'; // Importation de la fonction utilitaire pour formater l'argent
import productsData from '../../data/productsData'; // Importation des données de produits

// Importation des styles Swiper
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import "swiper/scss/effect-coverflow";

// Composant FeaturedSlider représentant un curseur (slider) de produits en vedette
const FeaturedSlider = () => {

    // Filtrage des produits marqués comme "featured-product"
    const featuredProducts = productsData.filter(item => item.tag === 'featured-product');

    // Rendu du composant Swiper pour afficher les produits en vedette
    return (
        <Swiper
            modules={[EffectCoverflow, Pagination, A11y, Autoplay]} // Utilisation des modules Swiper
            loop={true} // Activation de la boucle infinie
            speed={400} // Vitesse de transition entre les diapositives
            spaceBetween={100} // Espace entre les diapositives
            slidesPerView={"auto"} // Nombre de diapositives visibles par vue
            pagination={{ clickable: true }} // Activation de la pagination avec des points cliquables
            effect={"coverflow"} // Effet de type "coverflow"
            centeredSlides={true} // Centrer les diapositives actives
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 70,
                modifier: 3,
                slideShadows: false,
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 200
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 250
                },
            }}
            className="featured_swiper"
        >
            {
                // Mapper les produits en vedette pour les afficher dans le curseur
                featuredProducts.map((item) => {
                    const { id, images, title, finalPrice, originalPrice, path } = item;
                    const newPrice = displayMoney(finalPrice);
                    const oldPrice = displayMoney(originalPrice);

                    return (
                        <SwiperSlide key={id} className="featured_slides">
                            <div className="featured_title">{title}</div>
                            <figure className="featured_img">
                                {/* Lien vers la page du produit */}
                                <Link to={`${path}${id}`}>
                                    <img src={images[0]} alt="" />
                                </Link>
                            </figure>
                            <h2 className="products_price">
                                {newPrice} &nbsp;
                                <small><del>{oldPrice}</del></small>
                            </h2>
                        </SwiperSlide>
                    );
                })
            }
        </Swiper>
    );
};

// Exportation du composant FeaturedSlider
export default FeaturedSlider;
