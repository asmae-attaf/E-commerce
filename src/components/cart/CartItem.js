import React, { useContext, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import cartContext from '../../contexts/cart/cartContext';

const CartItem = (props) => {
  const {
    id,
    nom,
    title,
    path,
    prix,
    imageproduit,
    quantity: initialQuantity = 1,
    updateUserQuantity
  } = props;

  const { removeItem, incrementItem, decrementItem, updateItemQuantity } = useContext(cartContext);

  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncreaseQuantity = () => {
    if (quantity < 20) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      incrementItem(id);
      updateItemQuantity(id, quantity + 1);
      updateUserQuantity(quantity + 1); // Informer le composant parent de la mise à jour
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      decrementItem(id);
      updateItemQuantity(id, quantity - 1);
      updateUserQuantity(quantity - 1); // Informer le composant parent de la mise à jour
    }
  };

  return (
    <div className="cart_item">
      <figure className="cart_item_img">
        <Link to={`${path}${id}`}>
          {imageproduit && <img src={imageproduit} alt="product-img" />}
        </Link>
      </figure>
      <div className="cart_item_info">
        <div className="cart_item_head">
          <h4 className="cart_item_title">
            <Link to={`${path}${id}`}>{title}</Link>
          </h4>
          <div className="cart_item_del">
            <span onClick={() => removeItem(id)}>
              <FaTrash />
            </span>
            <div className="tooltip">Supprimer</div>
          </div>
        </div>
        <h4 className="cart_item_title">
          <Link to={`/product-details/${id}`}>{nom}</Link>
        </h4>
        <h2 className="cart_item_price">
          <Link to={`${path}${id}`}>{prix} MAD</Link>
        </h2>
        <div className="item_actions">
          <div className="quantity_controls">
            <button onClick={handleDecreaseQuantity}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncreaseQuantity}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
