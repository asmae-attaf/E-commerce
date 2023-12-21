import React, { useContext, useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import axios from 'axios';  // Ajout de l'import pour axios
import AuthService from '../form/ServicesConnexionInscription/auth.service'; // replace with the actual path

import cartContext from '../../contexts/cart/cartContext';
import { FavoritesContext } from '../../favoris/favoritesContext';

const ProductCard = (props) => {
    const { id, nom, description, prix, stock, categorie, imageproduit, path } = props;
    const { addToFavorites, getFavoriteItems } = useContext(FavoritesContext);
    const { addItem, cartItems } = useContext(cartContext);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isHeartActive, setIsHeartActive] = useState(false);

    useEffect(() => {
        const favoriteItems = getFavoriteItems();
        const isItemInFavorites = favoriteItems.some(item => item.id === id);
        setIsHeartActive(isItemInFavorites);
    }, [getFavoriteItems, id]);

    useEffect(() => {
        const isItemInCart = cartItems.some(item => item.id === id);
        setIsAddedToCart(isItemInCart);
    }, [cartItems, id]);

    const handleAddItem = () => {
        const item = { ...props };
        addItem(item);
        setIsAddedToCart(true);
        
    };

    const handleAddToFavorites = async () => {
        const item = { ...props };
        addToFavorites(item);
        setIsHeartActive(true);
    
        const currentUser = AuthService.getCurrentUser();
    const userId = currentUser ? currentUser.id : null;

    if (!userId) {
        console.error('Erreur: Impossible de récupérer l\'ID de l\'utilisateur depuis le local storage.');
        return;
    }
        const produitId = item.id;
        console.log(produitId);
    
        try {
            await axios.post('http://localhost:8080/api/Favoris/add', {
                user: { id: userId },
                produit: { id: produitId } 
            });
            console.log('Favori ajouté avec succès !');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du favori :', error);
        }
    };

    const newPrice = displayMoney(prix);

    return (
        <div className="card products_card">
            <figure className="products_img">
                <Link to={`${path}${id}`}>
                    <img src={imageproduit} alt="product-img" />
                </Link>
            </figure>
            <div className="products_details">
                <h3 className="products_title">
                    <Link to={`${path}${id}`}>{nom}</Link>
                </h3>
                <div className="separator"></div>
                <h2 className="products_price">
                    {newPrice}
                </h2>
                <button type="button" onClick={handleAddToFavorites}>
                    <FaHeart color={isHeartActive ? 'red' : 'grey'} size={24} />
                </button>
                <button
                    type="button"
                    onClick={handleAddItem}
                    className="cart-button align-right"
                >
                    <FontAwesomeIcon icon={faCartPlus} style={{ color: "#000000", fontSize: '1.5rem' }} />
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
