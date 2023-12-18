// Importations des modules React nécessaires
import React, { createContext, useReducer } from 'react';
import cartReducer from './cartReducer';  // Importation du réducteur du panier depuis un fichier local

// Création du contexte pour le panier d'achat
const cartContext = createContext();

// État initial du panier
const initialState = {
    cartItems: []  // Le panier démarre avec un tableau vide d'articles
};

// Composant CartProvider responsable de fournir le contexte du panier
const CartProvider = ({ children }) => {
    
    // Utilisation de useReducer pour gérer l'état du panier
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Actions dispatchées pour manipuler le panier
    const addItem = (item) => {
        return dispatch({
            type: 'ADD_TO_CART',
            payload: { item }
        });
    };

    const removeItem = (itemId) => {
        return dispatch({
            type: 'REMOVE_FROM_CART',
            payload: { itemId }
        });
    };

    const incrementItem = (itemId) => {
        return dispatch({
            type: 'INCREMENT_ITEM',
            payload: { itemId }
        });
    };

    const decrementItem = (itemId) => {
        return dispatch({
            type: 'DECREMENT_ITEM',
            payload: { itemId }
        });
    };
    const updateQuantity = (itemId, newQuantity) => {
        dispatch({
          type: 'UPDATE_QUANTITY',
          payload: {
            itemId,
            newQuantity,
          },
        });
      };
    
      const updateItemQuantity = (itemId, newQuantity) => {
        dispatch({
          type: 'UPDATE_ITEM_QUANTITY',
          payload: { itemId, newQuantity },
        });
      };
    const addToFavorites = (item) => {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: item });
    };
    
    // Valeurs à mettre dans le contexte
    const values = {
        ...state,           // L'état actuel du panier
        addItem,            // Fonction d'ajout d'un article au panier
        removeItem,         // Fonction de suppression d'un article du panier
        incrementItem,      // Fonction d'incrémentation de la quantité d'un article
        decrementItem,      // Fonction de décrémentation de la quantité d'un article
        addToFavorites ,
        updateQuantity ,
        updateItemQuantity
            // Fonction d'ajout d'un article aux favoris
    };

    // Rendu du composant fournisseur de contexte
    return (
        <cartContext.Provider value={values}>
            {children}
        </cartContext.Provider>
    );
};

// Exportation du contexte par défaut et du composant CartProvider
export default cartContext;
export { CartProvider };
