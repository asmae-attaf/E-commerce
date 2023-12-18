import React, { useContext, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { BsCartX } from 'react-icons/bs';
import useDocTitle from '../hooks/useDocTitle';
import cartContext from '../contexts/cart/cartContext';
import CartItem from '../components/cart/CartItem';
import EmptyView from '../components/common/EmptyView';

const Cart = () => {
  useDocTitle('Cart');

  const { cartItems } = useContext(cartContext);
  const cartQuantity = cartItems.length;

  const [userQuantity, setUserQuantity] = useState(1);

  const handleDecreaseQuantity = () => {
    if (userQuantity > 1) {
      setUserQuantity(userQuantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    // Vous pouvez ajouter une limite si nécessaire (par exemple, userQuantity < 20)
    setUserQuantity(userQuantity + 1);
  };

  const calculateTotalPrice = () => {
    // Calculer le prix total en fonction des données du panier
    let total = 0;
    cartItems.forEach((item) => {
      total += item.prix * userQuantity;
    });
    return total.toFixed(2); // Limite à deux décimales
  };
  

  return (
    <>
      <section id="cart" className="section">
        <div className="container">
          {cartQuantity === 0 ? (
            <EmptyView
              icon={<BsCartX />}
              msg="Votre panier est vide"
              link="/all-products"
              btnText="Commencez vos achats"
            />
          ) : (
            <div className="wrapper cart_wrapper">
               <div className="cart_left_col">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    updateUserQuantity={(newQuantity) => setUserQuantity(newQuantity)}
                  />
                ))}
              </div>

              <div className="cart_right_col">
                <div className="order_summary">
                  <h3>
                    Commandes &nbsp;
                    ({cartQuantity} {cartQuantity > 1 ? 'articles' : 'article'})
                  </h3>
                  <div className="order_summary_details">
                    <div className="price">
                      <span>Nom produit</span>
                      <span>Quantité</span>
                      <span>Prix</span>
                    </div>

                    {cartItems.map((item) => (
                      <div key={item.id} className="price">
    <b>{item.nom.length > 20 ? `${item.nom.substring(0, 20)}...` : item.nom}</b>
                        <div>
                          <b>{userQuantity}</b>
                        </div>
                        <div>
                          <b>{item.prix} DH</b>
                        </div>
                      </div>
                    ))}
                    <div className="separator"></div>
                    <div className="total_price">
                      <b>
                        <small>Le prix total</small>
                      </b>
                      <b>{calculateTotalPrice()} DH</b>
                    </div>
                  </div>

                  {/* Reste de votre code pour PayPal */}
                  


                  <PayPalScriptProvider
                    options={{
                      'client-id': 'AX8cUovFrNKqCMmCZQtuBvC-d-67ce5sYOkdigWNbGnfxCndVsosw82LVLkwVJV0hLwj7js6X1xlU2-o',
                      currency: 'USD',
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: calculateTotalPrice(),
                              },
                            },
                          ],
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;