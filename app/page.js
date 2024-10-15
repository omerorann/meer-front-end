"use client";
import { useRef } from "react"; // Import useRef to create a ref
import ProductSlider from "./components/productSlider";
import Footer from "./components/Footer"; // Import the Footer component

export default function Home() {
  const sliderRef = useRef(null); // Create a ref for the ProductSlider

  // Function to handle the scroll
  const handleScrollToSlider = () => {
    if (sliderRef.current) {
      const offset = 100; // Kaydırma mesafesi
      const top =
        sliderRef.current.getBoundingClientRect().top + window.scrollY - offset; // Kaydırılacak konum
      window.scrollTo({ top, behavior: "smooth" }); // Yavaşça kaydır
    }
  };

  return (
    <main className="relative min-h-screen">
      {/* Background Video Section */}
      <div className="relative w-full h-screen">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="/videos/videoplayback.mp4"
            type="video/mp4"
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
          Your browser does not support the video tag.
        </video>
        {/* Picture Background */}
        <img
          src="/images/background3.jpeg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-0 z-10"></div>

        {/* Content Section */}
      </div>

      {/* Product Slider Section */}
      <div ref={sliderRef} className="relative">
        {" "}
        {/* Attach the ref to the section */}
        {/* Product Slider Component */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mt-8">Yeni Ürünler</h2>
        </div>
        <ProductSlider />
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Hizmetlerimiz</h2>
          <div className="flex flex-wrap justify-center mt-8">
            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold">Ücretsiz Kargo</h3>
                <p className="mt-2">
                  Belirli ürünlerde ücretsiz kargo fırsatları.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold">Hızlı Teslimat</h3>
                <p className="mt-2">
                  Siparişleriniz en kısa sürede kapınıza gelir.
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold">Müşteri Desteği</h3>
                <p className="mt-2">
                  7/24 hizmet veren müşteri destek ekibimizle iletişime geçin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
