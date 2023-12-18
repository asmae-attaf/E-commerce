import React, { useContext, useEffect, useState } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import useDocTitle from '../hooks/useDocTitle';
import FilterBar from '../components/filters/FilterBar';
import ProductCard from '../components/product/ProductCard';
import Services from '../components/common/Services';
import filtersContext from '../contexts/filters/filtersContext';
import EmptyView from '../components/common/EmptyView';
import axios from 'axios'; // Assurez-vous d'avoir installé axios via npm install axios

const AllProducts = () => {
    useDocTitle('All Products');
    const { allProducts } = useContext(filtersContext);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/produit/Allproduits');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <section id="all_products" className="section">
                <FilterBar />
                <div className="container">
                    {products.length ? (
                        <div className="wrapper products_wrapper">
                            {products.map(item => (
                                <ProductCard key={item.id} {...item} />
                            ))}
                        </div>
                    ) : (
                        <EmptyView icon={<BsExclamationCircle />} msg="No Results Found" />
                    )}
                </div>
            </section>
            <Services />
        </>
    );
};

export default AllProducts;
