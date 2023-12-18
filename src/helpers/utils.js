// utils.js

export const displayMoney = (n) => {
    const numFormat = new Intl.NumberFormat('fr-MA', {
        style: 'currency',
        currency: 'MAD',
    });
    const formattedMoney = numFormat.format(n);
    return `${formattedMoney}`;
};

export const calculateTotalPriceForCart = (cartItems) => {
    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.prix) * item.quantity;
        return total + itemPrice;
    }, 0);
    return totalPrice;
};

// ... (autres fonctions)





// Calculate Discount Percentage
export const calculateDiscount = (discountedPrice, originalPrice) => {
    const discountedPercent = (discountedPrice / originalPrice) * 100;

    return Math.round(discountedPercent);
};


// Calculate Total Amount
export const calculateTotal = (arr) => {
    const total = arr.reduce((accum, val) => accum + val, 0);

    return total;
};