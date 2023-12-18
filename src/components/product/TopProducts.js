import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import useActive from '../../hooks/useActive';
import ProductCard from './ProductCard';

import './TopProducts.css';

const TopProducts = () => {
    const [products, setProducts] = useState([]);
    const [categoriesWithImages, setCategoriesWithImages] = useState([]);
    const { activeClass, handleActive } = useActive(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/categorie/AllCategorie');
                const data = await response.json();

                const uniqueCategories = Array.from(new Set(data.filter(category => !category.parentCategorie).map(category => category.name)));

                const generatedCategories = uniqueCategories.map(categoryName => {
                    const category = data.find(category => category.name === categoryName);
                    return {
                        name: categoryName,
                        image: category.image,
                    };
                });

                setCategoriesWithImages(generatedCategories);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories :', error);
            }
        };

        fetchCategories();
    }, []);

    const fetchProductsByCategory = async (categoryName) => {
        try {
            const response = await fetch(`http://localhost:8080/api/produit/Allproduits?categorie=${categoryName}`);
            const data = await response.json();
            setProducts(data);
            console.log(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
        }
    };

    const handleProducts = (category, i) => {
        fetchProductsByCategory(category);
        handleActive(i);
    };

    return (
        <>
            <div className="products_filter_tabs">
                <div className="category-image">
                    {categoriesWithImages.map((item, i) => (
                        item.image && (
                            <img
                                key={i}
                                src={item.image}
                                alt={item.name}
                                className="category-image circular-image"
                                style={{ width: '120px', height: '120px', marginLeft: '50px' }}
                            />
                        )
                    ))}
                </div>
                <ul className="tabs">
                    {categoriesWithImages.map((item, i) => (
                        <li
                            key={i}
                            className={`tabs_item ${activeClass(i)}`}
                            onClick={() => handleProducts(item.name, i)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="wrapper products_wrapper">
                {products.slice(0, 11).map(item => (
                    <ProductCard key={item.id} {...item} />
                ))}
                <div className="card products_card browse_card">
                    <Link to="/all-products">
                        Voir tous <br /> les produits <BsArrowRight />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TopProducts;
