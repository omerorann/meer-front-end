"use client";
import { useRef } from "react"; // Import useRef to create a ref
import ProductSlider from "./components/productSlider";
import Footer from "./components/Footer"; // Import the Footer component

export default function Home() {
  const sliderRef = useRef(null); // Create a ref for the ProductSlider

  // Function to handle the scroll
  const handleScrollToSlider = () => {
    if (sliderRef.current) {
      const offset = 100; // Scroll offset
      const top =
        sliderRef.current.getBoundingClientRect().top + window.scrollY - offset; // Scroll position
      window.scrollTo({ top, behavior: "smooth" }); // Smooth scroll
    }
  };

  return (
    <main className="relative min-h-screen">
      {/* Background Image Section */}
      <div
        className="relative w-full 
  aspect-[16/9] // Bu, yüksekliği genişliğe göre ayarlar
  sm:aspect-[4/3] // Küçük ekranlar ve üzeri için oranı ayarlayın
  md:aspect-[3/2] // Orta ekranlar ve üzeri için oranı ayarlayın
  lg:aspect-[16/9] // Büyük ekranlar için oranı ayarlayın
  xl:aspect-[21/9]" // Ekstra büyük ekranlar için oranı ayarlayın
        style={{
          backgroundImage: 'url("/images/background4.jpeg")',
          backgroundSize: "cover", // Resmin uygun bir şekilde ölçeklenmesini sağlar
          backgroundPosition: "center", // Resmi ortalar
          backgroundRepeat: "no-repeat", // Resmin tekrar etmesini engeller
        }}
      >
        {/* Bu div arka plan olarak görev yapar */}
      </div>

      {/* Product Slider Section */}
      <div ref={sliderRef} className="relative">
        {/* Product Slider Component */}

        <ProductSlider />
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold">Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold">Ücretsiz Kargo</h3>
              <p className="mt-2">
                Belirli ürünlerde ücretsiz kargo fırsatları.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold">Hızlı Teslimat</h3>
              <p className="mt-2">
                Siparişleriniz en kısa sürede kapınıza gelir.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold">Müşteri Desteği</h3>
              <p className="mt-2">
                7/24 hizmet veren müşteri destek ekibimizle iletişime geçin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
