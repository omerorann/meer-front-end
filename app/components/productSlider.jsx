"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://meer-backend-3189f875378d.herokuapp.com/UrunYonetimi/getProducts"
      );
      setProducts(response.data); // API'den ürünleri al
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <h2 className="text-2xl font-bold text-center mb-6">Tüm Ürünler</h2>
      <div className="relative flex items-center justify-center">
        {/* Sol ok */}
        <button
          className="absolute left-0 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-200 transition"
          onClick={() => {
            document.getElementById("product-slider").scrollBy({
              left: -300,
              behavior: "smooth",
            });
          }}
        >
          &#8592;
        </button>

        <div
          id="product-slider"
          className="flex gap-6 overflow-x-scroll scroll-smooth snap-x scrollbar-hide"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-center min-w-[300px] transition-transform transform hover:scale-105"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Sağ ok */}
        <button
          className="absolute right-0 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-200 transition"
          onClick={() => {
            document.getElementById("product-slider").scrollBy({
              left: 300,
              behavior: "smooth",
            });
          }}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
