// commonContext.js

import { createContext, useReducer } from 'react';
import commonReducer from './commonReducer';

const commonContext = createContext();

const initialState = {
  isFormOpen: false,
  formUserInfo: '',
  isSearchOpen: false,
  searchResults: [],
  isLoggedIn: false, // Ajout de l'état initial pour la connexion
};

const CommonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commonReducer, initialState);

  const toggleForm = (toggle) => {
    return dispatch({
      type: 'TOGGLE_FORM',
      payload: { toggle },
    });
  };

  const setFormUserInfo = (info) => {
    return dispatch({
      type: 'SET_FORM_USER_INFO',
      payload: { info },
    });
  };

  const toggleSearch = (toggle) => {
    return dispatch({
      type: 'TOGGLE_SEARCH',
      payload: { toggle },
    });
  };

  const setSearchResults = (results) => {
    return dispatch({
      type: 'SET_SEARCH_RESULTS',
      payload: { results },
    });
  };

  const setLoggedIn = (isLoggedIn) => {
    return dispatch({
      type: 'SET_LOGGED_IN',
      payload: { isLoggedIn },
    });
  };

  const values = {
    ...state,
    toggleForm,
    setFormUserInfo,
    toggleSearch,
    setSearchResults,
    setLoggedIn,
  };

  return (
    <commonContext.Provider value={values}>
      {children}
    </commonContext.Provider>
  );
};

export default commonContext;
export { CommonProvider };
