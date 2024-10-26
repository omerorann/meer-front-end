import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper/modules";
import "swiper/css"; // Swiper CSS yüklemesi
import ProductCard from "./ProductCard";

const ProductSlider = ({ productData, prevButtonId, nextButtonId }) => {
  // Ürünleri rastgele sıralamak için bir yardımcı fonksiyon
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Rastgele sıralanmış ürün verileri
  const shuffledProducts = shuffleArray([...productData]);

  return (
    <div className="w-full pb-10 px-2 lg:px-0">
      <div className="w-full">
        <Swiper
          spaceBetween={5}
          slidesPerView={7}
          slidesPerGroup={4}
          navigation={{
            prevEl: prevButtonId,
            nextEl: nextButtonId,
          }}
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade]}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 5,
              slidesPerGroup: 2,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 15,
              slidesPerGroup: 2,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 20,
              slidesPerGroup: 2,
            },
          }}
        >
          {shuffledProducts.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="scale-95">
                <ProductCard product={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSlider;
