// Importation de React pour la création de composants
import React from 'react';
import HeroSlider from '../components/sliders/HeroSlider'; // Importation du composant HeroSlider pour le slider principal
import FeaturedSlider from '../components/sliders/FeaturedSlider'; // Importation du composant FeaturedSlider pour les produits en vedette
import SectionsHead from '../components/common/SectionsHead'; // Importation du composant SectionsHead pour les en-têtes de section
import TopProducts from '../components/product/TopProducts'; // Importation du composant TopProducts pour les meilleurs produits
import Services from '../components/common/Services'; // Importation du composant Services pour les services

// Composant principal pour la page d'accueil
const Home = () => {

    return (
        <main>
            {/* Section pour le slider principal (hero) */}
            <section id="hero">
                <HeroSlider />
            </section>

            {/* Section pour les produits en vedette */}
            <section id="featured" className="section">
                <div className="container">
                    {/* En-tête de section pour les produits en vedette */}
                    <SectionsHead heading="Featured Products" />
                    {/* Composant FeaturedSlider pour afficher les produits en vedette dans un curseur */}
                    <FeaturedSlider />
                </div>
            </section>
<div>

    <img src='../images/products/blackFriday.webp' alt="BlackFriday"/>
</div>
            {/* Section pour les meilleurs produits */}
            <section id="products" className="section">
                <div className="container">
                    {/* En-tête de section pour les meilleurs produits */}
                    <SectionsHead heading="Top Products" />
                    {/* Composant TopProducts pour afficher les meilleurs produits */}
                    <TopProducts />
                </div>
            </section>

            {/* Composant Services pour afficher les services */}
            <Services />
        </main>
    );
};

// Exportation du composant Home pour pouvoir l'utiliser ailleurs dans l'application.
export default Home;
