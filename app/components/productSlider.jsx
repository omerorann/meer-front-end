"use client";
import React, { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper/modules";
import "swiper/css"; // Swiper CSS yüklemesi

import ProductCard from "./ProductCard";
const ProductSlider = () => {
  const [productData, setProductData] = useState([]); // productData'yı useState ile yönetiyoruz

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `https://meer-backend-3189f875378d.herokuapp.com/UrunYonetimi/getProducts`
        );
        setProductData(response.data); // Veriyi state'e set ediyoruz
        console.log("response: ", response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []); // Boş dizi, sadece bileşen ilk render edildiğinde çalışır.

  return (
    <div className="w-full mt-4 pb-10 px-2 lg:px-0">
      <div className="container mx-auto ">
        <div className="flex justify-center items-center">
          <div className="lg:flex">
            <div
              id="prevProductSlider"
              className="w-12 h-12 border rounded-full flex justify-center items-center hover:shadow-lg duration-500"
            >
              <SlArrowLeft size={16} />
            </div>
            <div
              id="nextProductSlider"
              className="w-12 h-12 border rounded-full flex justify-center items-center ml-2 hover:shadow-lg duration-500"
            >
              <SlArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-12 ">
        <Swiper
          spaceBetween={10}
          slidesPerView={7}
          navigation={{
            prevEl: "#prevProductSlider",
            nextEl: "#nextProductSlider",
          }}
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
          }}
        >
          {productData.map((item, index) => (
            <SwiperSlide key={index}>
              <ProductCard product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
