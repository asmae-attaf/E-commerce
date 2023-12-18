// Importation de React et d'autres modules nécessaires depuis les bibliothèques et fichiers locaux.
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdStar, IoMdCheckmark } from 'react-icons/io';
import { calculateDiscount, displayMoney } from '../helpers/utils';
import useDocTitle from '../hooks/useDocTitle';
import useActive from '../hooks/useActive';
import cartContext from '../contexts/cart/cartContext';
import productsData from '../data/productsData';
import SectionsHead from '../components/common/SectionsHead';
import RelatedSlider from '../components/sliders/RelatedSlider';
import ProductSummary from '../components/product/ProductSummary';
import Services from '../components/common/Services';

// Composant principal pour la page de détails du produit.
const ProductDetails = () => {

    // Utilisation d'un hook personnalisé pour mettre à jour le titre du document.
    useDocTitle('Product Details');

    // Utilisation des hooks personnalisés pour gérer l'onglet actif et les interactions avec le panier.
    const { handleActive, activeClass } = useActive(0);
    const { addItem } = useContext(cartContext);

    // Utilisation du hook useParams pour extraire le paramètre d'ID de produit de l'URL.
    const { productId } = useParams();

    // Conversion de l'ID de produit en nombre (le paramètre est reçu sous forme de chaîne).
    const prodId = parseInt(productId);

    // Récupération du produit correspondant à l'ID de produit de l'ensemble de données local.
    const product = productsData.find(item => item.id === prodId);

    // Extraction des données du produit pour une utilisation plus facile.
    const { images, title, info, category, finalPrice, originalPrice, ratings, rateCount } = product;

    // État local pour gérer l'image de prévisualisation du produit.
    const [previewImg, setPreviewImg] = useState(images[0]);

    // Gestion de l'ajout d'un article au panier.
    const handleAddItem = () => {
        addItem(product);
    };

    // Configuration de l'image de prévisualisation au chargement initial et à chaque changement d'image.
    useEffect(() => {
        setPreviewImg(images[0]);
        handleActive(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);

    // Gestion de la prévisualisation de l'image.
    const handlePreviewImg = (i) => {
        setPreviewImg(images[i]);
        handleActive(i);
    };

    // Calcul des prix et des remises.
    const discountedPrice = originalPrice - finalPrice;
    const newPrice = displayMoney(finalPrice);
    const oldPrice = displayMoney(originalPrice);
    const savedPrice = displayMoney(discountedPrice);
    const savedDiscount = calculateDiscount(discountedPrice, originalPrice);

    // Rendu du composant de détails du produit.
    return (
        <>
            <section id="product_details" className="section">
                <div className="container">
                    <div className="wrapper prod_details_wrapper">
                        {/* Colonne de gauche pour les onglets et les images du produit */}
                        <div className="prod_details_left_col">
                            {/* Onglets pour changer les images du produit */}
                            <div className="prod_details_tabs">
                                {images.map((img, i) => (
                                    <div
                                        key={i}
                                        className={`tabs_item ${activeClass(i)}`}
                                        onClick={() => handlePreviewImg(i)}
                                    >
                                        <img src={img} alt="product-img" />
                                    </div>
                                ))}
                            </div>
                            {/* Image principale du produit */}
                            <figure className="prod_details_img">
                                <img src={previewImg} alt="product-img" />
                            </figure>
                        </div>
                        {/* Colonne de droite pour les détails du produit */}
                        <div className="prod_details_right_col">
                            {/* Titre, information, et évaluation du produit */}
                            <h1 className="prod_details_title">{title}</h1>
                            <h4 className="prod_details_info">{info}</h4>
                            <div className="prod_details_ratings">
                                <span className="rating_star">
                                    {[...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)}
                                </span>
                                <span>|</span>
                                <Link to="*">{ratings} Ratings</Link>
                            </div>
                            {/* Séparateur pour une mise en page propre */}
                            <div className="separator"></div>
                            {/* Prix du produit, remise, disponibilité, etc. */}
                            <div className="prod_details_price">
                                <div className="price_box">
                                    <h2 className="price">
                                        {newPrice} &nbsp;
                                        <small className="del_price"><del>{oldPrice}</del></small>
                                    </h2>
                                    <p className="saved_price">You save: {savedPrice} ({savedDiscount}%)</p>
                                    <span className="tax_txt">(Inclusive of all taxes)</span>
                                </div>
                                {/* Badge pour indiquer la disponibilité en stock */}
                                <div className="badge">
                                    <span><IoMdCheckmark /> en Stock</span>
                                </div>
                            </div>
                            {/* Séparateur pour une mise en page propre */}
                            <div className="separator"></div>
                            {/* Offres et réductions disponibles */}
                            <div className="prod_details_offers">
                                <h4>Offers and Discounts</h4>
                                <ul>
                                    <li>No Cost EMI on Credit Card</li>
                                    <li>Pay Later & Avail Cashback</li>
                                </ul>
                            </div>
                            {/* Séparateur pour une mise en page propre */}
                            <div className="separator"></div>
                            {/* Bouton pour ajouter le produit au panier */}
                            <div className="prod_details_buy_btn">
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={handleAddItem}
                                >
                                    ajouter au panier
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Composant ProductSummary pour afficher les détails du produit dans différents onglets */}
            <ProductSummary {...product} />
            {/* Section pour afficher des produits connexes */}
            <section id="related_products" className="section">
                <div className="container">
                    <SectionsHead heading="Related Products" />
                    {/* Composant RelatedSlider pour afficher les produits connexes dans un curseur */}
                    <RelatedSlider category={category} />
                </div>
            </section>
            {/* Composant Services pour afficher les services */}
            <Services />
        </>
    );
};

// Exportation du composant ProductDetails pour pouvoir l'utiliser ailleurs dans l'application.
export default ProductDetails;
