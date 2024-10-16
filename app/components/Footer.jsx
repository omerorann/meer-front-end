// components/Footer.jsx
import {
  CiFacebook,
  CiTwitter,
  CiInstagram,
  CiYoutube,
  CiLinkedin,
} from "react-icons/ci";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-8 text-center">
      <div className="max-w-screen-lg mx-auto">
        <p className="mb-4">&copy; 2024 Meer. Tüm hakları saklıdır.</p>

        <div className="flex justify-center space-x-4 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CiFacebook size={30} className="text-white hover:text-gray-400" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CiTwitter size={30} className="text-white hover:text-gray-400" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CiInstagram size={30} className="text-white hover:text-gray-400" />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CiYoutube size={30} className="text-white hover:text-gray-400" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CiLinkedin size={30} className="text-white hover:text-gray-400" />
          </a>
        </div>

        <div className="flex justify-center space-x-8 mb-4">
          <a href="/about" className="hover:text-gray-400">Hakkımızda</a>
          <a href="/contact" className="hover:text-gray-400">İletişim</a>
          <a href="/privacy" className="hover:text-gray-400">Gizlilik Politikası</a>
          <a href="/terms" className="hover:text-gray-400">Kullanım Şartları</a>
          <a href="/faq" className="hover:text-gray-400">S.S.S.</a>
        </div>

        <p className="text-sm">Yardım mı gerekiyor? Bizi arayın: <a href="tel:+1234567890" className="hover:text-gray-400">+1 (234) 567-890</a></p>
      </div>
    </div>
  );
};

export default Footer;
