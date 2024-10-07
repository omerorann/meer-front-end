"use client";
import React, { useEffect, useState } from "react";
import { CiSearch, CiUser, CiMenuBurger, CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import axios from "axios"; // Axios'ı içe aktarın

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Giriş yapıldıysa kullanıcı bilgilerini al
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "https://meer-backend-3189f875378d.herokuapp.com/api/auth/me",
            {
              headers: {
                Authorization: `Bearer ${token}`, // Token'ı yetkilendirme başlığı olarak ekle
              },
            }
          );
          setUserName(response.data.name || "User"); // Kullanıcı adını ayarla
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Kullanıcı bilgileri alınamadı:", error);
          // Eğer hata alırsanız, kullanıcıyı çıkış yapmaya yönlendirebilirsiniz.
          setIsLoggedIn(false);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center">
        <button className="text-gray-800 hover:text-gray-600 transition duration-300 ml-4 md:hidden">
          <CiMenuBurger size={24} />
        </button>
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
            Kategoriler
          </a>
          <a
            href="/indirimler"
            className="text-red-600 hover:text-gray-600 transition duration-300 text-lg"
          >
            İndirimler
          </a>
        </nav>
      </div>
      <h1
        className="text-3xl text-gray-800 cursor-pointer"
        style={{ fontFamily: "Jeju Myeongjo, serif", letterSpacing: "0.2em" }}
        onClick={() => router.push("/")}
      >
        meer
      </h1>
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

        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-800">{userName}</span>
            <button
              onClick={handleLogout}
              className="text-gray-800 hover:text-gray-600 transition duration-300"
            >
              Çıkış Yap
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="text-gray-800 hover:text-gray-600 transition duration-300"
          >
            <CiUser size={28} />
          </button>
        )}

        <button className="text-gray-800 hover:text-gray-600 transition duration-300">
          <CiShoppingCart size={30} />
        </button>
      </div>
    </header>
  );
};

export default Header;
