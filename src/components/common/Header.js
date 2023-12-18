import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser, AiOutlineHeart } from 'react-icons/ai';
import { dropdownMenu } from '../../data/headerData';
import commonContext from '../../contexts/common/commonContext';
import cartContext from '../../contexts/cart/cartContext';
import { FavoritesContext } from '../../favoris/favoritesContext';
import Login from '../form/Login';
import SearchBar from './SearchBar';

const Header = () => {
  const { formUserInfo, toggleForm, toggleSearch } = useContext(commonContext);
  const { cartItems } = useContext(cartContext);
  const { favoriteItems } = useContext(FavoritesContext);
  const [isSticky, setIsSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    setIsLoggedIn(!!formUserInfo);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser || {});
  }, [formUserInfo]);

  const cartQuantity = cartItems.length;
  const favoritesQuantity = favoriteItems.length;

  return (
    <>
      <div style={{ paddingBottom: '0px' }}>
        <img src="../images/products/header.gif" alt="Header Image" />
      </div>

      <header id="header" className={isSticky ? 'sticky' : ''} style={{ marginTop: '20px' }}>
        <div className="container">
          <div className="navbar">
            <h2 className="nav_logo">
              <Link to="/">Fashi</Link>
            </h2>
            <nav className="nav_actions">
              <div className="search_action" onClick={() => toggleSearch(true)}>
                <AiOutlineSearch />
                <div className="tooltip">Chercher</div>
              </div>

              <div className="cart_action">
                <Link to="/cart">
                  <AiOutlineShoppingCart />
                  {cartQuantity > 0 && <span className="badge">{cartQuantity}</span>}
                </Link>
                <div className="tooltip">Panier</div>
              </div>

              <div className="cart_action">
                <Link to="/wishlist">
                  <AiOutlineHeart />
                  {favoritesQuantity > 0 && <span className="badge">{favoritesQuantity}</span>}
                </Link>
                <div className="tooltip">Favoris</div>
              </div>

              <div className="user_action">
                <span>
                  <AiOutlineUser />
                </span>
                <div className="dropdown_menu">
                  <h4>
                  Salut! {user && user.nom && user.prenom && <span style={{ color: 'pink' }}>&nbsp;{user.nom} {user.prenom}</span>}
                  </h4>
                  {isLoggedIn ? (
                    <button type="button" >
                      Se déconnecter
                    </button>
                  ) : (
                    <button type="button" onClick={() => toggleForm(true)}>
                      Se connecter / S'inscrire
                    </button>
                  )}
                  <div className="separator"></div>
                  <ul>
                    {dropdownMenu.map((item) => (
                      <li key={item.id}>
                        <Link to={item.path}>{item.link}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <SearchBar />
      <Login />
    </>
  );
};

export default Header;
