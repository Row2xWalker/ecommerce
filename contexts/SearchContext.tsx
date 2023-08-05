"use client"
import React, { createContext, useState, useContext, useEffect } from 'react';

const SearchContext = createContext();

export function useSearchContext() {
    return useContext(SearchContext);
}

export function SearchProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState('');

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    // Replace the 'products' array with your actual product data
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/product');
            const data = await response.json();
            setProducts(data)
        }

        fetchProducts()
    }, [])

    useEffect(() => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };
    return (
        <SearchContext.Provider
            value={{ searchQuery, handleSearchChange, filteredProducts }}
        >
            {children}
        </SearchContext.Provider>
    );
}