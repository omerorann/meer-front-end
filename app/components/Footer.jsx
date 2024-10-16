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
      <p>&copy; 2024 Meer. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CiFacebook size={30} className="text-white hover:text-gray-400" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <CiTwitter size={30} className="text-white hover:text-gray-400" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CiInstagram size={30} className="text-white hover:text-gray-400" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
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
    </div>
  );
};

export default Footer;
