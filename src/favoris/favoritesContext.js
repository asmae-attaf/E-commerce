import React, { createContext, useReducer } from 'react';
import favoritesReducer from './favoritesReducer';

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

  const getFavoriteItems = () => {
    return state.favoriteItems;
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

export  { FavoritesContext, FavoritesProvider };
