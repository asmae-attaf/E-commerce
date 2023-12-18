import React from 'react';
import { Routes, Route } from 'react-router';
import useScrollRestore from '../hooks/useScrollRestore';
import AllProducts from '../pages/AllProducts';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import ErrorPage from '../pages/ErrorPage';
import Wishlist from '../pages/Wishlist';
import Payment from '../pages/Payment'

const RouterRoutes = () => {

    useScrollRestore();

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />

                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/product-details/:productId" element={<ProductDetails />} />
                <Route path="/payment" element={<Payment />} />

                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    );
};

export default RouterRoutes;