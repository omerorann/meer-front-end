"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }) => {
  const router = useRouter();

  // İndirimli fiyatı hesapla
  const discountedPrice = product.discountValue
    ? (product.price * (1 - product.discountValue / 100)).toFixed(2)
    : null;

  return (
    <div
      className="relative w-64 h-96 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105"
      onClick={() => router.push(`/productDetails/${product.id}`)} // Ürün detay sayfasına yönlendir
    >
      <img
        src={product.imgUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* İndirim yüzdesi etiketi */}
      {product.discountValue && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded">
          %{product.discountValue}
        </div>
      )}

      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800">{product.name}</h1>
        <p className="text-sm text-gray-600 mt-2">
          {product.brand || "Ürün markası mevcut değil."}
        </p>
        <div className="mt-2">
          {discountedPrice ? ( // İndirimli fiyat var mı kontrolü
            <>
              <span className="text-lg font-semibold text-gray-800">
                {discountedPrice} TL
              </span>
              <span className="text-sm line-through text-gray-500 ml-2">
                {product.price} TL
              </span>
            </>
          ) : (
            <p className="text-lg font-semibold text-gray-800">
              {product.price} TL
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
