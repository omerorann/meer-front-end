"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../../redux/userSlice";
import { useRouter } from "next/navigation";

const Hesabim = () => {
  const [userData, setUserData] = useState(null); // Kullanıcı verilerini tutmak için state
  const [orders, setOrders] = useState([]); // Sipariş geçmişini tutmak için state
  const [error, setError] = useState(null); // Hata durumunu yönetmek için state
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Token'ı localStorage'dan al

        const response = await axios.get(
          "https://meer-backend-3189f875378d.herokuapp.com/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Bearer token'ı ekle
            },
          }
        );

        setUserData(response.data); // Kullanıcı verilerini state'e kaydet

        // Örnek olarak sipariş verilerini ekliyorum, backend siparişleri dönerse burayı dinamik yapabilirsin
        setOrders([
          { id: 1234, date: "25 Eylül 2023", total: 450 },
          { id: 1235, date: "17 Ağustos 2023", total: 120 },
        ]);
      } catch (error) {
        setError("Kullanıcı verileri yüklenirken bir hata oluştu.");
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    dispatch(clearUser());
    router.push("/");
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-6">Hesabım</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-6">Hesabım</h1>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Hesabım</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {/* Kullanıcı Bilgileri */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Kullanıcı Bilgileri</h2>
          <p className="mb-2">
            <strong>Ad Soyad:</strong> {userData.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {userData.email}
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Bilgileri Güncelle
          </button>
        </div>

        {/* Sipariş Geçmişi */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Sipariş Geçmişi</h2>
          <ul>
            {orders.map((order) => (
              <li key={order.id} className="mb-2">
                <strong>Sipariş #{order.id}:</strong> {order.date} - {order.total}
                ₺
              </li>
            ))}
          </ul>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Tüm Siparişleri Gör
          </button>
        </div>

        {/* Adres Bilgileri */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Adres Bilgileri</h2>
          <p className="mb-2">
            <strong>Adres:</strong> {userData.address || "Adres eklenmemiş"}
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Adresi Güncelle
          </button>
        </div>

        {/* Şifre Değiştir */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Şifre Değiştir</h2>
          <button className="px-4 py-2 bg-red-500 text-white rounded">
            Şifreyi Değiştir
          </button>
        </div>
      </div>

      {/* Çıkış Yap */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded"
          onClick={handleLogout}
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default Hesabim;
