import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios'; // Importez axios
import favoritesReducer from './favoritesReducer';
import AuthService from '../components/form/ServicesConnexionInscription/auth.service';

const FavoritesContext = createContext();

const initialState = { favoriteItems: [] };

const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addToFavorites = (item) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: item });
  };

  const removeFromFavorites = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: itemId });
  };
  const currentUser = AuthService.getCurrentUser();
  const userId = currentUser ? currentUser.id : null;
  const getFavoriteItems = async (userId) => {
    try {
      // Ajoutez l'import axios pour utiliser axios
      const response = await axios.get(`http://localhost:8080/api/Favoris/user/${31}/products`);
      const products = response.data;
      console.log('je suis favorites contexte', products);

      dispatch({ type: 'SET_FAVORITE_ITEMS', payload: products });
    } catch (error) {
      console.error('Erreur lors de la récupération des produits favoris :', error);
    }
  };

  const values = {
    ...state,
    addToFavorites,
    removeFromFavorites,
    getFavoriteItems,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites doit être utilisé à l\'intérieur de FavoritesProvider');
  }
  return context;
};

export { FavoritesContext, FavoritesProvider, useFavorites };
