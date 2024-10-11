"use client";
import React, { useEffect, useState } from "react";
import { CiSearch, CiUser, CiMenuBurger, CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import axios from "axios";
import classNames from "classnames";

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("isDark");
    if (savedTheme) {
      setIsDark(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const response = await axios.post(
            "https://meer-backend-3189f875378d.herokuapp.com/api/auth/me",
            {}, // POST isteği için boş bir gövde gönderiyoruz
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserName(response.data.name || "User");
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Kullanıcı bilgileri alınamadı:", error);
          alert("Kullanıcı bilgileri alınamadı. Lütfen tekrar giriş yapın.");
          setIsLoggedIn(false);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setLoading(false); // Token yoksa yükleniyor durumunu kapat
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsDark(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.value;
    if (query) {
      router.push(`/search?query=${query}`);
    }
  };

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    localStorage.setItem("isDark", JSON.stringify(!isDark));
  };

  return (
    <header
      className={classNames(
        "sticky top-0 z-50 bg-opacity-20 backdrop-blur-lg shadow-md transition duration-300",
        { "bg-gray-900": isDark, "bg-white": !isDark }
      )}
    >
      <div className="flex items-center justify-between p-4">
        {/* Soldaki Menü ve Linkler */}
        <div className="flex items-center space-x-4">
          <button
            className={`hover:text-gray-600 transition duration-300 ml-4 ${
              isDark
                ? "text-white hover:text-gray-400"
                : "text-gray-800 hover:text-gray-600"
            }`}
            aria-label="Açık menü"
          >
            <CiMenuBurger size={24} />
          </button>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/tumurunler"
              className={`transition duration-300 text-lg ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              Tüm Ürünler
            </a>
            <a
              href="#"
              className={`transition duration-300 text-lg ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              Kategoriler
            </a>
            <a
              href="/indirimler"
              className={`transition duration-300 text-lg ${
                isDark
                  ? "text-white hover:text-red-400"
                  : "text-red-600 hover:text-gray-600"
              }`}
            >
              İndirimler
            </a>
          </nav>
        </div>

        {/* Ortadaki Logo */}
        <div className="flex-grow flex justify-center">
          <h1
            className={`text-3xl cursor-pointer hidden md:block transition duration-300 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
            style={{
              fontFamily: "Jeju Myeongjo, serif",
              letterSpacing: "0.2em",
            }}
            onClick={() => router.push("/")}
          >
            meer
          </h1>
        </div>

        {/* Sağdaki Arama, Kullanıcı ve Sepet */}
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Arama yap..."
              className={`border border-gray-300 rounded-full pl-4 pr-12 py-2 focus:outline-none focus:border-gray-500 transition duration-300 w-full bg-transparent ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            />
            <button
              type="submit"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition duration-300 ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
              aria-label="Arama"
            >
              <CiSearch size={20} />
            </button>
          </form>

          {loading ? (
            <div className="text-gray-800">Yükleniyor...</div>
          ) : isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <CiUser
                size={28}
                className={`transition duration-300 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              />
              <span
                className={`transition duration-300 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                {userName}
              </span>
              <button
                onClick={handleLogout}
                className={`transition duration-300 ${
                  isDark
                    ? "text-white hover:text-gray-400"
                    : "text-gray-800 hover:text-gray-600"
                }`}
                aria-label="Çıkış Yap"
              >
                Çıkış Yap
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className={`transition duration-300 ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
              aria-label="Giriş Yap"
            >
              Giriş Yap
            </button>
          )}

          <button
            className={`transition duration-300 ${
              isDark
                ? "text-white hover:text-gray-400"
                : "text-gray-800 hover:text-gray-600"
            }`}
            aria-label="Sepet"
          >
            <CiShoppingCart size={30} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
