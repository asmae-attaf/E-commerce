// Réducteur (Reducer) pour gérer les actions liées au panier d'achat

const cartReducer = (state, action) => {
    switch (action.type) {

        // Action d'ajout d'un article au panier
        case 'ADD_TO_CART':
            const newItemId = action.payload.item.id;
            const itemExist = state.cartItems.some(item => item.id === newItemId);

            let updatedCartItems = null;

            if (itemExist) {
                // Si l'article existe déjà dans le panier, incrémenter la quantité
                updatedCartItems = state.cartItems.map(item => {
                    if (item.id === newItemId) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    }
                    return item;
                });
            } else {
                // Si l'article n'existe pas, l'ajouter au panier
                updatedCartItems = [...state.cartItems, action.payload.item];
            }

            // Retourner un nouvel état avec les articles du panier mis à jour
            return {
                ...state,
                cartItems: updatedCartItems
            };


        // Action de suppression d'un article du panier
        case 'REMOVE_FROM_CART':
            // Retourner un nouvel état avec l'article retiré du panier
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload.itemId)
            };
            case 'UPDATE_QUANTITY':
                return {
                  ...state,
                  cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.itemId
                      ? { ...item, quantity: action.payload.newQuantity }
                      : item
                  ),
                };


        // Action d'incrémentation de la quantité d'un article dans le panier
        case 'INCREMENT_ITEM':
            // Retourner un nouvel état avec la quantité de l'article incrémentée
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    if (item.id === action.payload.itemId) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        };
                    }
                    return item;
                })
            };


        // Action de décrémentation de la quantité d'un article dans le panier
        case 'DECREMENT_ITEM':
            // Retourner un nouvel état avec la quantité de l'article décrémentée
            // et filtrer les articles avec une quantité non nulle
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    if (item.id === action.payload.itemId) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        };
                    }
                    return item;
                }).filter(item => item.quantity !== 0)
            };
            case 'ADD_TO_FAVORITES':
                return {
                  ...state,
                  cartItems: [...state.cartItems, action.payload],
                };

        // Action par défaut, retourner l'état inchangé
        default:
            return state;
    }
};

// Exporter le réducteur
export default cartReducer;