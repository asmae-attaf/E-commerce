// favoritesReducer.js
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      // Check if the item is already in favorites
      if (state.favoriteItems.find(item => item.id === action.payload.id)) {
        return state; // If yes, do not add it again
      }

      return {
        ...state,
        favoriteItems: [...state.favoriteItems, action.payload],
      };
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default favoritesReducer;
