"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

const ProductDetailPage = () => {
  const { id } = useParams(); // Ürün ID'sini URL'den almak
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(""); // Seçilen beden
  const [quantity, setQuantity] = useState(1); // Seçilen adet
  const router = useRouter();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `https://meer-backend-3189f875378d.herokuapp.com/UrunYonetimi/GetProductById/${id}`
      );
      setProduct(response.data); // API'den gelen tek ürün verisi
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <p>Loading...</p>; // Ürün yükleniyorken gösterilen mesaj
  }

  // İndirimli fiyat hesaplama
  const discountedPrice = product.discount
    ? product.price * (1 - product.discountValue / 100)
    : product.price;

  return (
    <div className="container mx-auto px-4 py-8 mr-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Ürün görseli */}
        <div className="relative w-full md:w-1/3">
          <img
            src={product.productImg}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg border border-gray-800"
          />
          {/* İndirim etiketi */}
          {product.discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded cursor-default">
              %{product.discountValue}
            </span>
          )}
        </div>

        {/* Ürün detayları */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <Link
            href={`/brand/${product.brand}`}
            className="text-xl text-gray-800 mb-4 font-semibold cursor-pointer transition duration-300 ease-in-out inline-block hover:text-black"
          >
            {product.brand}
          </Link>
          <p className="text-lg text-gray-600 mt-2 mb-6">
            {product.description}
          </p>

          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-gray-800">
              ₺
              <span className="ml-1">
                {discountedPrice.toFixed(2).replace(".", ",")}
              </span>
            </span>
            {/* İndirimli fiyat gösterimi */}
            {product.discount && (
              <span className="text-sm text-red-500 ml-4 line-through">
                ₺
                <span className="ml-1">
                  {product.price.toFixed(2).replace(".", ",")}
                </span>
              </span>
            )}
          </div>

          {/* Beden Seçimi */}
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSize(selectedSize === size ? "" : size)
                  }
                  className={`px-4 py-2 border border-gray-300 rounded-lg transition duration-300 ease-in-out ${
                    selectedSize === size ? "bg-gray-300" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Adet Seçimi */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="px-4 py-2 border border-gray-300 rounded-l-lg transition duration-300 ease-in-out hover:bg-gray-300"
            >
              -
            </button>
            <span className="px-4 py-2 border-t border-b border-gray-300 text-lg text-gray-800">
              {quantity}
            </span>
            <button
              onClick={() =>
                setQuantity(
                  quantity < product.amount ? quantity + 1 : product.amount
                )
              }
              className="px-4 py-2 border border-gray-300 rounded-r-lg transition duration-300 ease-in-out hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Sepete Ekle butonu */}
          <button
            onClick={() => handleAddToCart(product.id)}
            className="px-6 py-3 border border-black text-black rounded-lg hover:bg-gray-900 hover:text-white transition duration-300 ease-in-out"
          >
            Sepete Ekle
          </button>

          {/* Favorilere Ekle butonu */}
          <button
            onClick={() => handleAddToFavorites(product.id)}
            className="mt-4 px-6 py-3 bg-transparent text-black rounded-lg hover:bg-gray-900 hover:text-white transition duration-300 ease-in-out ml-8"
          >
            Favorilere Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

// Sepete ekleme işlevi
const handleAddToCart = async (productId) => {
  try {
    const token = localStorage.getItem("token"); // Token'i localStorage'dan al
    await axios.post(
      "https://meer-backend-3189f875378d.herokuapp.com/Product/AddToCart",
      {
        productId,
        token, // Token'i body'ye ekle
      }
    );
    alert("Ürün sepete başarıyla eklendi!");
  } catch (error) {
    console.error("Sepete ekleme hatası:", error);
  }
};

// Favorilere ekleme işlevi
const handleAddToFavorites = async (productId) => {
  try {
    const token = localStorage.getItem("token"); // Token'i localStorage'dan al
    await axios.post(
      "https://meer-backend-3189f875378d.herokuapp.com/Product/AddToFavorites",
      {
        productId,
        token, // Token'i body'ye ekle
      }
    );
    alert("Ürün favorilere başarıyla eklendi!");
  } catch (error) {
    console.error("Favorilere ekleme hatası:", error);
  }
};

export default ProductDetailPage;
