import React from 'react';

interface Product {
    name: string,
    category: string,
    description: string,
    stocks: number,
    price: number,
    images?: [string],
    sold?: number
    _id: string
    // Add other product properties here
}

interface Props {
    productItem: Product;
    localQuantity: number;
    isInCart: (productId: string) => boolean;
    addToCart: (product: Product, quantity: number) => void;
}

const AddToCartButton: React.FC<Props> = ({ productItem, localQuantity, isInCart, addToCart }) => {
    const productItemId = productItem._id;
    return (
        <button
            className="bg-gray-500 text-white p-2 rounded-lg mt-4 shadow-md hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
            onClick={() => addToCart(productItem, localQuantity)}
            disabled={isInCart(productItemId)}
        >
            {isInCart(productItemId) ? `Already In Cart` : `Add to Cart`}
        </button>
    );
};

export default AddToCartButton;