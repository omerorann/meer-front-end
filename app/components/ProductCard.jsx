"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip durumu için state

  // İndirimli fiyatı hesapla (indirim varsa)
  const discountedPrice =
    product.discountValue > 0
      ? (product.price * (1 - product.discountValue / 100)).toFixed(2)
      : null;

  return (
    <div
      className="relative w-64 h-96 rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105"
      onClick={() => router.push(`/productDetails/${product.id}`)} // Ürün detay sayfasına yönlendir
    >
      <img
        src={product.imgUrl}
        alt={product.name}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-200 ease-in-out hover:brightness-110" // Resmi parlak göstermek için hover ile brightness ekleniyor
      />

      {/* Üstteki koyu katman */}
      <div className="absolute inset-0 bg-black transition-opacity duration-300 ease-in-out opacity-30 hover:opacity-0"></div>

      {/* İndirim yüzdesi etiketi */}
      {product.discountValue > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded">
          %{product.discountValue}
        </div>
      )}

      {/* Yazılar kartın altına sabitlenmiş */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-60 text-white">
        {/* Alt kısımda yazılar */}
        <div className="relative">
          <h1
            className="text-xl font-semibold overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)} // Tooltip göster
            onMouseLeave={() => setShowTooltip(false)} // Tooltip gizle
          >
            {product.name}
          </h1>
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 bottom-full mb-1 w-auto bg-gray-800 text-white text-xs p-2 rounded shadow-lg transition-all duration-300 ease-in-out 
            ${showTooltip ? 'transform scale-90 opacity-100' : 'transform scale-0 opacity-0'}
            `}
            style={{
              transformOrigin: "bottom", // Tooltip'in büyüme merkezi
              whiteSpace: "nowrap", // Yazının tek satırda kalmasını sağla
              maxWidth: "500px", // Tooltip genişliğini ayarlayarak metnin kesilmesini sağla
            }}
          >
            {product.name} {/* Tam metin burada gösteriliyor */}
          </div>
        </div>
        <p className="text-sm mt-2">{product.brand || "Ürün markası mevcut değil."}</p>
        <div className="mt-2">
          {discountedPrice ? ( // İndirimli fiyat var mı kontrolü
            <>
              <span className="text-lg font-semibold">{discountedPrice} TL</span>
              <span className="text-sm line-through text-gray-300 ml-2">{product.price} TL</span>
            </>
          ) : (
            <p className="text-lg font-semibold">{product.price} TL</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
