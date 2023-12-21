import React, { useContext, useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import { FavoritesContext } from '../../favoris/favoritesContext';
import axios from 'axios';
import AuthService from '../form/ServicesConnexionInscription/auth.service'; // replace with the actual path


const WishlistItem = (props) => {
    const { id, nom, prix, imageproduit } = props;
    const { removeFromFavorites } = useContext(FavoritesContext);
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [fetchedProductIds, setFetchedProductIds] = useState(new Set());
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser ? currentUser.id : null;
  

    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            try {
                if (!fetchedProductIds.size) {
                    // Appel de l'API pour récupérer les produits favoris de l'utilisateur connecté
                    const response = await axios.get(`http://localhost:8080/api/Favoris/user/${userId}/products`);
                    const products = response.data;
                    console.log('Products:', products);


                    // Mise à jour de l'état local avec la liste des produits favoris
                    setFavoriteProducts(products);

                    // Mise à jour des identifiants des produits déjà récupérés
                    setFetchedProductIds(new Set(products.map(product => product.id)));
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des produits favoris :', error);
            }
        };

        // Appel de la fonction pour récupérer les produits favoris au montage du composant
        fetchFavoriteProducts();
    }, [userId, fetchedProductIds]);

    return (
        <div className="wishlist_item">
            {/* Affichez la liste des produits favoris */}
            {favoriteProducts.map((product) => (
                <div key={product.id}>
                    <Link to={`/product-details/${product.id}`}>
                        <img src={product.imageproduit} alt="product-img" />
                    </Link>
                    <div className="wishlist_item_details">
                        <h3 className="wishlist_item_title">
                            <Link to={`/product-details/${product.id}`}>{product.nom}</Link>
                        </h3>
                        <div className="separator"></div>
                        <h2 className="wishlist_item_price">{displayMoney(product.prix)}</h2>
                        <button
                            type="button"
                            //  onClick={() => handleRemoveFromFavorites(product.id)}
                            style={{ color: 'red' }}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WishlistItem;
