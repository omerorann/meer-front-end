"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../../redux/userSlice";
import {
  LiaShoppingBagSolid,
  LiaUserSolid,
  LiaSearchSolid,
} from "react-icons/lia";
import classNames from "classnames";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, userName } = useSelector((state) => state.user);
  const [isDark, setIsDark] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false); // Arama çubuğu aktif mi?
  const [showCategories, setShowCategories] = useState(true); // Kategorilerin görünürlüğü

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
      setIsDark(window.scrollY > 50);
      setShowCategories(window.scrollY === 0); // Sayfa kaydırıldığında kategorileri gizle
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    dispatch(clearUser());
  };

  return (
    <header
      className={classNames(
        "sticky top-0 z-50 bg-opacity-20 backdrop-blur-lg shadow-md transition duration-300",
        { "bg-gray-900": isDark, "bg-white": !isDark }
      )}
    >
      <div className="flex items-center justify-between p-4">
        {/* Soldaki Logo */}
        <div className="flex items-center space-x-4 ml-4">
          <h1
            className={`text-3xl cursor-pointer transition duration-300 ${
              isDark ? "text-white" : "text-gray-800"
            }`}
            onClick={() => router.push("/")}
          >
            meer
          </h1>
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
              onFocus={() => setIsSearchActive(true)} // Arama kutusu odaklanınca aktif olur
              onBlur={() => setIsSearchActive(false)} // Odak dışına çıkınca kapanır
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
              className={`absolute top-full left-0 w-full shadow-lg rounded-b-lg overflow-hidden transition-all duration-300 ${
                isSearchActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
              style={{ transition: "max-height 0.3s ease, opacity 0.3s ease" }}
            >
              <ul
                className={`p-4 border rounded-b-lg border-gray-800  ${
                  isDark
                    ? " text-white border-gray-400"
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
        <div className="flex items-center space-x-4">
          {userName ? (
            <button
              onClick={handleLogout}
              className={`flex items-center space-x-2 transition duration-300 ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              <LiaUserSolid size={28} />
              <span className="hover:underline">Hesabım</span>
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className={`flex items-center space-x-2 transition duration-300 ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              <LiaUserSolid size={28} />
              <span>Giriş Yap</span>
            </button>
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
        <div
          className={`flex justify-center p-2 bg-opacity-20 ${
            isDark ? "bg-gray-900" : "bg-white"
          } transition duration-300`}
        >
          <nav className="flex space-x-6">
            <a
              href="#"
              className={`transition duration-300 ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              Elektronik
            </a>
            <a
              href="#"
              className={`transition duration-300 ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              Moda
            </a>
            <a
              href="#"
              className={`transition duration-300 ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              Ev/Yaşam
            </a>
            <a
              href="#"
              className={`transition duration-300 ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              Spor
            </a>
            <a
              href="#"
              className={`transition duration-300 ${
                isDark
                  ? "text-white hover:text-gray-400"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              Gıda
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
