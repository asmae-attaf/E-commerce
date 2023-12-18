import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = () => {
  const paypalOptions = {
    'client-id': 'AX8cUovFrNKqCMmCZQtuBvC-d-67ce5sYOkdigWNbGnfxCndVsosw82LVLkwVJV0hLwj7js6X1xlU2-o',
    currency: 'USD',
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: '10.00',
          },
        },
      ],
    });
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons createOrder={createOrder} />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
