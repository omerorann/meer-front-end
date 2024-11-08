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
        `${process.env.NEXT_PUBLIC_API_URL}/UrunYonetimi/getProducts`
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
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-x-16">
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
