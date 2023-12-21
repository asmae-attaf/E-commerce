import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillStarFill } from 'react-icons/bs';
import { FavoritesContext } from '../favoris/favoritesContext';
import WishlistItem from '../components/cart/WishlistItem';
import EmptyView from '../components/common/EmptyView';

const Wishlist = () => {
    const { favoriteItems, getFavoriteItems } = useContext(FavoritesContext);
    const [favoritesQuantity, setFavoritesQuantity] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getFavoriteItems();
                // Mettez à jour la quantité de favoris après la récupération
                setFavoritesQuantity(favoriteItems.length);
            } catch (error) {
                console.error('Error fetching favorite items:', error);
            }
        };

        fetchData();
    }, [getFavoriteItems, favoriteItems]);

    return (
        <>
            <section id="wishlist" className="section">
                <div className="container">
                    {favoritesQuantity === 0 ? (
                        <EmptyView
                            icon={<BsFillStarFill />}
                            msg="Votre Liste de Favoris est vide"
                            link="/all-products"
                            btnText="Ajouter aux Favoris"
                        />
                    ) : (
                        <div className="container">
                            <div className="wrapper products_wrapper">
                                {favoriteItems.map(item => (
                                    <WishlistItem key={item.id} {...item} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Wishlist;
