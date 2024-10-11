"use client";
import React, { useEffect, useState } from "react";
import { CiSearch, CiUser, CiMenuBurger, CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import axios from "axios"; // Axios'ı içe aktarın

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDark, setIsDark] = useState(false); // Yeni durum: isDark

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

  useEffect(() => {
    const handleScroll = () => {
      setIsDark(window.scrollY > 50); // 50px'lik bir kaydırma sonrası durumu değiştir
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Temizleme
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className={`sticky top-0 z-50 bg-white bg-opacity-20 backdrop-blur-lg shadow-md transition duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`flex items-center justify-between p-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        <div className="flex items-center">
          <button className={`hover:text-gray-600 transition duration-300 ml-4 md:hidden ${isDark ? 'text-white hover:text-gray-400' : 'text-gray-800 hover:text-gray-600'}`}>
            <CiMenuBurger size={24} />
          </button>
          <nav className="hidden md:flex items-center space-x-8 ml-8">
            <a href="/tumurunler" className={`transition duration-300 text-lg ${isDark ? 'text-white hover:text-gray-400' : 'text-gray-800 hover:text-gray-600'}`}>
              Tüm Ürünler
            </a>
            <a href="#" className={`transition duration-300 text-lg ${isDark ? 'text-white hover:text-gray-400' : 'text-gray-800 hover:text-gray-600'}`}>
              Kategoriler
            </a>
            <a href="/indirimler" className={`transition duration-300 text-lg text-red-600 ${isDark ? 'text-white hover:text-red-400' : 'text-red-600 hover:text-gray-600'}`}>
              İndirimler
            </a>
          </nav>
        </div>
        <h1
          className="text-3xl cursor-pointer"
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
              className={`border border-gray-300 rounded-full pl-4 pr-12 py-2 focus:outline-none focus:border-gray-500 transition duration-300 w-full bg-transparent ${isDark ? 'text-white' : 'text-gray-800'}`}
            />
            <button className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition duration-300 ${isDark ? 'text-white hover:text-gray-400' : 'text-gray-800 hover:text-gray-600'}`}>
              <CiSearch size={20} />
            </button>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className={`transition duration-300 ${isDark ? 'text-white' : 'text-gray-800'}`}>{userName}</span>
              <button
                onClick={handleLogout}
                className={`transition duration-300 ${isDark ? 'text-white hover:text-gray-400' : 'text-gray-800 hover:text-gray-600'}`}
              >
                Çıkış Yap
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className={`transition duration-300 ${isDark ? 'text-white hover:text-gray-400' : 'text-gray-800 hover:text-gray-600'}`}
            >
              <CiUser size={28} />
            </button>
          )}

          <button className={`transition duration-300 ${isDark ? 'text-white hover:text-gray-400' : 'text-gray-800 hover:text-gray-600'}`}>
            <CiShoppingCart size={30} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
