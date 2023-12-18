// Importation de React pour la création de composants
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Importation des composants Swiper nécessaires
import { Pagination, A11y } from 'swiper'; // Importation des modules Swiper
import productsData from '../../data/productsData'; // Importation des données de produits
import ProductCard from '../product/ProductCard'; // Importation du composant ProductCard pour afficher les cartes de produits

import 'swiper/scss'; // Importation des styles Swiper
import 'swiper/scss/pagination'; // Importation des styles spécifiques pour la pagination

// Composant RelatedSlider pour afficher une liste de produits liés dans un curseur (slider)
const RelatedSlider = (props) => {

    const { category } = props;

    // Filtrage des produits liés basés sur la catégorie spécifiée
    const relatedProduct = productsData.filter(item => item.category === category);

    // Rendu du composant Swiper pour afficher les produits liés
    return (
        <Swiper
            modules={[Pagination, A11y]} // Utilisation des modules Swiper
            spaceBetween={10} // Espace entre les diapositives
            slidesPerView={"auto"} // Nombre de diapositives visibles par vue (auto s'adapte en fonction de l'espace)
            pagination={{ clickable: true }} // Activation de la pagination avec des points cliquables
            breakpoints={{
                480: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 4,
                },
            }}
            className="related_swiper" // Classe CSS personnalisée pour le Swiper
        >
            {
                // Mapper les produits liés pour les afficher dans le curseur
                relatedProduct.map(item => (
                    <SwiperSlide key={item.id}>
                        {/* Utilisation du composant ProductCard pour afficher la carte de chaque produit lié */}
                        <ProductCard {...item} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

// Exportation du composant RelatedSlider pour pouvoir l'utiliser ailleurs dans l'application.
export default RelatedSlider;
