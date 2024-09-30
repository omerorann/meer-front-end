import React from "react";
import { CiSearch, CiUser, CiMenuBurger, CiShoppingCart } from "react-icons/ci";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        <button className="text-gray-800 hover:text-gray-600 transition duration-300 ml-4 md:hidden">
          <CiMenuBurger size={24} />
        </button>
        <div className="hidden md:flex items-center space-x-8 ml-8">
          <a
            href="#"
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
        </div>
      </div>
      <h1
        className="text-3xl text-gray-800 cursor-pointer"
        style={{ fontFamily: "Jeju Myeongjo, serif", letterSpacing: "0.2em" }}
      >
        meer
      </h1>
      <div className="flex items-center space-x-4"> {/* Sağda hizalanması için */}
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
