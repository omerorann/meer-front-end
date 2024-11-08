'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../../redux/userSlice';
import { useRouter } from 'next/navigation';

const Hesabim = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [activeTab, setActiveTab] = useState('kişiselBilgiler'); // Varsayılan sekme
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data);
        setOrders([
          { id: 1234, date: '25 Eylül 2023', total: 450 },
          { id: 1235, date: '17 Ağustos 2023', total: 120 },
        ]);
      } catch (error) {
        setError('Kullanıcı verileri yüklenirken bir hata oluştu.');
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    dispatch(clearUser());
    router.push('/');
  };

  const handleAddAddress = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/address`,
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewAddress({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      });
      setIsAddingAddress(false);
      fetchUser();
    } catch (error) {
      console.error('Adres eklenirken bir hata oluştu.', error);
    }
  };

  const handleUpdateAddress = async (addressId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/address/${addressId}`,
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewAddress({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      });
      setSelectedAddressId(null);
      fetchUser();
    } catch (error) {
      console.error('Adres güncellenirken bir hata oluştu.', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/address/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUser();
    } catch (error) {
      console.error('Adres silinirken bir hata oluştu.', error);
    }
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

      {/* Menü */}
      <div className="flex justify-around mb-6">
        <button
          className={`py-2 px-4 ${
            activeTab === 'kişiselBilgiler'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('kişiselBilgiler')}
        >
          Kişisel Bilgilerim
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'adresler' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('adresler')}
        >
          Adreslerim
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'siparisler'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('siparisler')}
        >
          Siparişlerim
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'favoriler' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('favoriler')}
        >
          Favorilerim
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === 'sifreDegistir'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('sifreDegistir')}
        >
          Şifreyi Değiştir
        </button>
      </div>

      {/* Aktif Sekme İçeriği */}
      {activeTab === 'kişiselBilgiler' && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Kullanıcı Bilgileri</h2>
          <p className="mb-2">
            <strong>Ad Soyad:</strong> {userData.name} {userData.surName}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="mb-2">
            <strong>Telefon Numarası:</strong> {userData.phoneNumber}
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Bilgileri Güncelle
          </button>
        </div>
      )}

      {activeTab === 'siparisler' && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Sipariş Geçmişi</h2>
          <ul>
            {orders.map((order) => (
              <li key={order.id} className="mb-2">
                <strong>Sipariş #{order.id}:</strong> {order.date} -{' '}
                {order.total}₺
              </li>
            ))}
          </ul>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Tüm Siparişleri Gör
          </button>
        </div>
      )}

      {activeTab === 'adresler' && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Adres Bilgileri</h2>
          {userData.addresses.length > 0 ? (
            userData.addresses.map((address) => (
              <div
                key={address.addressId}
                className="mb-2 flex justify-between"
              >
                <strong>Adres:</strong> {address.street}, {address.city},{' '}
                {address.state}, {address.postalCode}, {address.country}
                <div>
                  <button
                    onClick={() => {
                      setNewAddress({
                        street: address.street,
                        city: address.city,
                        state: address.state,
                        postalCode: address.postalCode,
                        country: address.country,
                      });
                      setSelectedAddressId(address.addressId);
                      setIsAddingAddress(true);
                    }}
                    className="text-blue-500 mr-2"
                  >
                    Güncelle
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.addressId)}
                    className="text-red-500"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Henüz bir adres eklemediniz.</p>
          )}
          {isAddingAddress ? (
            <div>
              <h3 className="text-lg font-semibold mt-4">
                Adres Ekle / Güncelle
              </h3>
              <input
                type="text"
                placeholder="Sokak"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
                className="border rounded p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Şehir"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                className="border rounded p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Eyalet"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
                className="border rounded p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Posta Kodu"
                value={newAddress.postalCode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, postalCode: e.target.value })
                }
                className="border rounded p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Ülke"
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, country: e.target.value })
                }
                className="border rounded p-2 mb-2 w-full"
              />
              <button
                onClick={() =>
                  selectedAddressId
                    ? handleUpdateAddress(selectedAddressId)
                    : handleAddAddress()
                }
                className="bg-blue-500 text-white rounded p-2"
              >
                {selectedAddressId ? 'Güncelle' : 'Ekle'}
              </button>
              <button
                onClick={() => {
                  setIsAddingAddress(false);
                  setSelectedAddressId(null);
                  setNewAddress({
                    street: '',
                    city: '',
                    state: '',
                    postalCode: '',
                    country: '',
                  });
                }}
                className="ml-2 bg-gray-500 text-white rounded p-2"
              >
                İptal
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingAddress(true)}
              className="mt-4 bg-blue-500 text-white rounded p-2"
            >
              Yeni Adres Ekle
            </button>
          )}
        </div>
      )}

      {activeTab === 'favoriler' && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Favori Ürünlerim</h2>
          {/* Favori ürünlerinizi buraya ekleyin */}
          <p>Henüz favori ürün eklemediniz.</p>
        </div>
      )}

      {activeTab === 'sifreDegistir' && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Şifre Değiştir</h2>
          <input
            type="password"
            placeholder="Eski Şifre"
            className="border rounded p-2 mb-2 w-full"
          />
          <input
            type="password"
            placeholder="Yeni Şifre"
            className="border rounded p-2 mb-2 w-full"
          />
          <input
            type="password"
            placeholder="Yeni Şifre Tekrar"
            className="border rounded p-2 mb-2 w-full"
          />
          <button className="mt-4 bg-blue-500 text-white rounded p-2">
            Şifreyi Değiştir
          </button>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white rounded p-2"
      >
        Çıkış Yap
      </button>
    </div>
  );
};

export default Hesabim;
