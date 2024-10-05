"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const AllProductsPage = () => {
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
      <div className="relative flex items-center">
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

        {/* Ürünler kaydırma alanı */}
        <div
          id="product-slider"
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x scrollbar-hide w-full px-10"
          style={{ overflowY: "hidden", height: "500px" }} // Yüksekliği 300px olarak ayarladık
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-center min-w-[250px] flex-shrink-0 transition-transform transform hover:scale-105"
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

export default AllProductsPage;
