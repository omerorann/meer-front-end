"use client";
import React from "react";
import { CiSearch, CiUser, CiMenuBurger, CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        {/* Menü butonu */}
        <button className="text-gray-800 hover:text-gray-600 transition duration-300 ml-4 md:hidden">
          <CiMenuBurger size={24} />
        </button>
        {/* Navigasyon Menüsü */}
        <nav className="hidden md:flex items-center space-x-8 ml-8">
          <a
            href="/tumurunler"
            className="text-gray-800 hover:text-gray-600 transition duration-300 text-lg"
          >
            Tüm Ürünler
          </a>
          <a
            href="#"
            className="text-gray-800 hover:text-gray-600 transition duration-300 text-lg"
          >
            Giyim
          </a>
          <a
            href="#"
            className="text-gray-800 hover:text-gray-600 transition duration-300 text-lg"
          >
            Aksesuar
          </a>
        </nav>
      </div>
      {/* Logo */}
      <h1
        className="text-3xl text-gray-800 cursor-pointer"
        style={{ fontFamily: "Jeju Myeongjo, serif", letterSpacing: "0.2em" }}
        onClick={() => router.push("/")}
      >
        meer
      </h1>
      {/* Arama Çubuğu ve Kullanıcı Simge */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Arama yap..."
            className="border border-gray-300 rounded-full pl-4 pr-12 py-2 focus:outline-none focus:border-gray-500 transition duration-300 w-full"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-800 hover:text-gray-600 transition duration-300">
            <CiSearch size={20} />
          </button>
        </div>
        <button className="text-gray-800 hover:text-gray-600 transition duration-300">
          <CiUser size={28} />
        </button>
        <button className="text-gray-800 hover:text-gray-600 transition duration-300">
          <CiShoppingCart size={30} />
        </button>
      </div>
    </header>
  );
};

export default Header;
