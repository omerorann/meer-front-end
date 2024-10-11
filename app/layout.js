import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Quicksand fontunu import et
const quicksand = Quicksand({
  weight: ["400", "500", "700"], // İhtiyacın olan ağırlıkları belirt
  subsets: ["latin"], // Latin alfabesi kullanıyorsan
  variable: "--font-quicksand", // CSS variable tanımlaması
});

export const metadata = {
  title: "m e e r",
  description: "m e e r - E-ticaret sitesi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} antialiased`}>
        <Header />
        
        {children}
        
        <Footer /> {/* Footer'ı buraya ekledik */}
      </body>
    </html>
  );
}
