// app/layout.js
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StoreProvider from "../redux/storeProvider";

const quicksand = Quicksand({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata = {
  title: "MEER - Türkiye",
  description: "MEER, Türkiye'nin yeni alışveriş platformu.",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${quicksand.variable} antialiased`}>
          <Header />
          <div className="mt-8"> {/* children'a margin-top ekledik */}
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </StoreProvider>
  );
}
