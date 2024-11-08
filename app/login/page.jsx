'use client'; // Bu bileşenin istemci tarafında çalıştığını belirtin

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice'; // Doğru import
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({ Email: '', Password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage(''); // Başarı mesajını sıfırla
    setLoading(true);

    if (!formData.Email || !formData.Password) {
      setErrorMessage('Email and password are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Yanıtı:', response.data); // Yanıtı kontrol et

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.user.name);

        // Redux ile kullanıcı bilgisini ayarla
        dispatch(
          setUser({
            token: response.data.token,
            userName: response.data.user.name,
          })
        );

        // Başarı mesajını ayarla
        setSuccessMessage('Başarıyla giriş yaptınız!');

        // Ana sayfaya yönlendir
        router.push('/');
      }
    } catch (error) {
      if (error.response) {
        console.log('API Hata Detayı:', error.response.data); // Hata detayını kontrol et
        setErrorMessage(error.response.data.message || 'Login failed.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md border border-gray-300">
        <h1 className="text-3xl font-semibold mb-6 text-center">Login</h1>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="Email"
              value={formData.Email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-lg font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="Password"
              value={formData.Password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className={`w-full ${
              loading ? 'bg-gray-400' : 'bg-blue-600'
            } text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
