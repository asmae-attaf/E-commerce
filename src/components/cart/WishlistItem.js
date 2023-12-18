// WishlistItem.js
import React, { useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import { FavoritesContext } from '../../favoris/favoritesContext';

const WishlistItem = (props) => {
    const { id, imageproduit, nom, description, prix } = props;
    const { removeFromFavorites } = useContext(FavoritesContext);

    const newPrice = displayMoney(prix);

    return (
        <div className="wishlist_item">
            <Link to={`/product-details/${id}`}>
                <img src={imageproduit} alt="product-img" />
            </Link>
            <div className="wishlist_item_details">
                <h3 className="wishlist_item_title">
                    <Link to={`/product-details/${id}`}>{nom}</Link>
                </h3>
                <div className="separator"></div>
                <h2 className="wishlist_item_price">{newPrice}</h2>
                <button
    type="button"
    onClick={() => removeFromFavorites(id)}
    style={{ color: 'red' /*, autres styles si nécessaire */ }}
>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default WishlistItem;
