"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }) => {
  const router = useRouter();

  return (
    <div
      className="w-64 h-96 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={() => router.push(`/productDetails/${product.id}`)} // Ürün detay sayfasına yönlendir
    >
      <img
        src={product.imgUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800">
          {product.name}
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          {product.description || "Ürün açıklaması mevcut değil."}
        </p>
        <p className="text-lg font-semibold text-gray-800 mt-2">
          {product.price} TL
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
