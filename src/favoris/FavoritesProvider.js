import React, { createContext, useReducer } from 'react';
import favoritesReducer from './favoritesReducer';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { favoriteItems: [] });

  const addToFavorites = (item) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: item });
  };

  const getFavoriteItems = () => {
    return state.favoriteItems;
  };

  const values = {
    favoriteItems: state.favoriteItems,
    addToFavorites,
    getFavoriteItems,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext, FavoritesProvider };
