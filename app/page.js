"use client";
import { useRef, useEffect, useState } from "react";
import ProductSlider from "./components/productSlider";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import axios from "axios";

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/UrunYonetimi/getProducts`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return [];
  }
};

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setAllProducts(products);
      setDiscountedProducts(products.filter((product) => product.discount));
    };
    loadProducts();
  }, []);

  const renderProductSlider = (title, products, prevId, nextId) => (
    <div className="flex flex-col items-center">
      <div className="flex justify-between items-center w-full max-w-6xl px-4">
        <h2 className="text-2xl font-bold mb-2 text-center absolute left-1/2 transform -translate-x-1/2">
          {title}
        </h2>
        <div className="ml-auto flex items-center">
          <div
            id={prevId}
            className="w-12 h-12 border rounded-full flex justify-center items-center hover:shadow-lg duration-500"
          >
            <SlArrowLeft size={16} />
          </div>
          <div
            id={nextId}
            className="w-12 h-12 border rounded-full flex justify-center items-center ml-2 hover:shadow-lg duration-500"
          >
            <SlArrowRight size={16} />
          </div>
        </div>
      </div>
      <ProductSlider
        productData={products}
        prevButtonId={`#${prevId}`}
        nextButtonId={`#${nextId}`}
      />
    </div>
  );

  return (
    <main className="relative min-h-screen">
      {/* Background Image Section */}
      <div
        className="relative w-full aspect-[16/9] sm:aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/9] xl:aspect-[21/9]"
        style={{
          backgroundImage: 'url("/images/background4.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Product Sliders */}
      {renderProductSlider(
        "Öne Çıkan Ürünler",
        allProducts,
        "prevProductSlider",
        "nextProductSlider"
      )}
      {renderProductSlider(
        "İndirimli Ürünler",
        discountedProducts,
        "prevDiscountSlider",
        "nextDiscountSlider"
      )}

      {/* Services Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold">Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {["Ücretsiz Kargo", "Hızlı Teslimat", "Müşteri Desteği"].map(
              (service, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className="text-xl font-semibold">{service}</h3>
                  <p className="mt-2">
                    {service === "Ücretsiz Kargo" &&
                      "Belirli ürünlerde ücretsiz kargo fırsatları."}
                    {service === "Hızlı Teslimat" &&
                      "Siparişleriniz en kısa sürede kapınıza gelir."}
                    {service === "Müşteri Desteği" &&
                      "7/24 hizmet veren müşteri destek ekibimizle iletişime geçin."}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
