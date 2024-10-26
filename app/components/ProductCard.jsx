"use client";

import React, { useState } from "react";
import PropTypes from "prop-types"; 
import Link from "next/link";

const ProductCard = ({ product }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [imgError, setImgError] = useState(false); 

  const discountedPrice =
    product.discountValue > 0
      ? (product.price * (1 - product.discountValue / 100)).toFixed(2)
      : null;

  return (
    <div className="group flex flex-col w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto h-auto">
      <Link
        href={`/productDetails/${product.id}`}
        className="relative w-full h-96 rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105"
      >
        <img
          src={imgError ? "/path/to/placeholder.jpg" : product.productImg}
          alt={product.name}
          onError={() => setImgError(true)} 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-200 ease-in-out hover:brightness-110"
        />

        <div className="absolute inset-0 bg-black transition-opacity duration-300 ease-in-out opacity-30 hover:opacity-0"></div>

        {product.discountValue > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded">
            %{product.discountValue}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-60 text-white">
          <div className="relative">
            <h1
              className="text-lg sm:text-xl font-semibold overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {product.name}
            </h1>
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 w-auto bg-gray-800 text-white text-xs p-2 rounded shadow-lg transition-all duration-300 ease-in-out 
              ${
                showTooltip
                  ? "transform scale-100 opacity-100"
                  : "transform scale-0 opacity-0"
              }
              `}
              style={{
                transformOrigin: "bottom",
                whiteSpace: "nowrap",
                maxWidth: "500px",
                zIndex: 10,
              }}
            >
              {product.name}
            </div>
          </div>
          <p className="text-sm mt-2">
            {product.brand || "Ürün markası mevcut değil."}
          </p>
          <div className="mt-2">
            {discountedPrice ? (
              <>
                <span className="text-lg sm:text-xl font-semibold">
                  {discountedPrice} TL
                </span>
                <span className="text-sm line-through text-gray-300 ml-2">
                  {product.price} TL
                </span>
              </>
            ) : (
              <p className="text-lg sm:text-xl font-semibold">{product.price} TL</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string,
    price: PropTypes.number.isRequired,
    discountValue: PropTypes.number,
    productImg: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
