"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard"; // ProductCard bileşenini içe aktar

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
      setProducts(response.data); // API'den ürünleri al (veri yapısını güncelledim)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex overflow-x-auto space-x-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} /> // ProductCard'ı kullan
      ))}
    </div>
  );
};

export default ProductSlider;
