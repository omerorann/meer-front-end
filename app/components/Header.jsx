"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../../redux/userSlice";
import {
  LiaShoppingBagSolid,
  LiaUserSolid,
  LiaSearchSolid,
  LiaBarsSolid,
} from "react-icons/lia";
import classNames from "classnames";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, userName } = useSelector((state) => state.user);
  const [isDark, setIsDark] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollThreshold = 100;

  useEffect(() => {
    const savedTheme = localStorage.getItem("isDark");
    if (savedTheme) {
      setIsDark(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserName = localStorage.getItem("userName");

    if (savedToken && savedUserName) {
      dispatch(setUser({ token: savedToken, userName: savedUserName }));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Sayfa en üstteyse header'ı göster
      if (currentScrollY === 0) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > scrollThreshold && window.innerWidth < 640) {
        if (currentScrollY > lastScrollY) {
          setIsHeaderVisible(false); // Aşağı kaydırıldığında header'ı gizle
        } else {
          setIsHeaderVisible(true); // Yukarı kaydırıldığında header'ı göster
        }
      }

      setLastScrollY(currentScrollY);
      setShowCategories(currentScrollY < 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    dispatch(clearUser());
  };

  return (
    <header
      className={classNames(
        "sticky top-0 z-50 bg-opacity-20 backdrop-blur-lg transition-transform duration-300 ease-in-out",
        {
          "bg-gray-900": isDark,
          "bg-white": !isDark,
          "transform -translate-y-full": !isHeaderVisible,
          "transform translate-y-0": isHeaderVisible,
        }
      )}
    >
      <div className="flex items-center justify-between p-4">
        {/* Soldaki Logo */}
        <div className="flex items-center space-x-4 ml-4 mr-4">
          <Link
            className={`text-3xl cursor-pointer transition duration-300 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
            href="/"
          >
            meer
          </Link>
        </div>

        {/* Ortada Arama Çubuğu */}
        <div className="flex justify-center flex-grow">
          <form className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Arama yap..."
              className={`border rounded-full pl-4 pr-12 py-2 focus:outline-none focus:border-gray-900 transition duration-300 w-full bg-transparent ${
                isDark
                  ? "text-white border-white focus:border-gray-400 hover:text-gray-400"
                  : "text-gray-800 border-gray-500 focus:border-gray-900"
              }`}
              onFocus={() => setIsSearchActive(true)}
              onBlur={() => setIsSearchActive(false)}
            />
            <button
              type="submit"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition duration-300 ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              <LiaSearchSolid size={22} />
            </button>

            {/* Arama sonuçları alanı */}
            <div
              className={`absolute top-full left-0 w-full shadow-lg rounded-b-lg overflow-hidden transition-all duration-300 z-10 ${
                isSearchActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
              style={{ transition: "max-height 0.3s ease, opacity 0.3s ease" }}
            >
              <ul
                className={`p-4 border rounded-b-lg border-gray-800 ${
                  isDark
                    ? "text-white border-gray-400"
                    : "bg-white text-gray-800"
                }`}
              >
                <li
                  className={`py-2 px-4 cursor-pointer transition duration-300 ${
                    isDark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                  }`}
                >
                  Sonuç 1
                </li>
                <li
                  className={`py-2 px-4 cursor-pointer transition duration-300 ${
                    isDark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                  }`}
                >
                  Sonuç 2
                </li>
                <li
                  className={`py-2 px-4 cursor-pointer transition duration-300 ${
                    isDark ? "hover:bg-gray-800" : "hover:bg-gray-200"
                  }`}
                >
                  Sonuç 3
                </li>
              </ul>
            </div>
          </form>
        </div>

        {/* Sağdaki Kullanıcı ve Sepet */}
        <div className="flex items-center space-x-4 ml-4 mr-4">
          {userName ? (
            <Link
              href={`/hesabim`}
              className={`flex items-center space-x-2 transition duration-300 ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              <LiaUserSolid size={28} />
              <span className="hidden sm:block font-semibold">Hesabım</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className={`flex items-center space-x-2 transition duration-300 ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              <LiaUserSolid size={28} />
              <span className="hidden sm:block font-semibold">Giriş Yap</span>
            </Link>
          )}

          <button
            className={`transition duration-300 ${
              isDark
                ? "text-white hover:text-gray-400"
                : "text-gray-800 hover:text-gray-600"
            }`}
          >
            <LiaShoppingBagSolid size={28} />
          </button>
        </div>
      </div>

      {/* Kategoriler */}
      {showCategories && (
        <div className="absolute top-full left-0 right-0 p-2 bg-opacity-0 bg-customGray transition duration-300 hover:bg-opacity-60 overflow-x-auto">
          <nav className="flex space-x-6 whitespace-nowrap xl:justify-center lg:justify-evenly">
            <Link
              href="/tumurunler"
              className="flex items-center space-x-2 cursor-pointer transition duration-300"
            >
              <LiaBarsSolid
                size={20}
                className={`transition duration-300 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              />
              <span>Tüm Kategoriler</span>
            </Link>

            {[
              "İndirimler",
              "Moda",
              "Elektronik",
              "Ev & Yaşam",
              "Spor",
              "Gıda",
              "Kozmetik",
              "Aksesuar",
              "Hobi",
            ].map((category) => (
              <a
                key={category}
                href={category === "İndirimler" ? "/indirimler" : "#"}
                className={`relative transition duration-300 group ${
                  category === "İndirimler" ? "text-red-600" : "text-gray-800"
                }`}
              >
                <span className="py-2 px-4">{category}</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-1 transition-transform duration-300 group-hover:scale-x-100 ${
                    category === "İndirimler" ? "bg-red-700" : "bg-gray-800"
                  } scale-x-0`}
                />
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
