"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const IndirimliUrunler = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://meer-backend-3189f875378d.herokuapp.com/UrunYonetimi/getProducts"
      );
      // Sadece indirimli ürünleri filtrele
      const discountedProducts = response.data.filter(
        (product) => product.discount
      );
      setProducts(discountedProducts); // Filtrelenmiş indirimli ürünleri ayarla
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="w-full p-6">
      <h2 className="text-3xl font-bold text-center mb-6">İndirimli Ürünler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2">
        {products.map((product) => (
          <div key={product.id} className="flex justify-center">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndirimliUrunler;
