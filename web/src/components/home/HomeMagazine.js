import SwiperCore, {A11y, Autoplay, Navigation, Pagination, Scrollbar} from 'swiper';
import React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import mainImage from "../../images/home/main_image.png"
import '../../stylesheets/Home.scss';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

export default () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation
            autoplay={{
                delay: 3000,
                disableOnInteraction: false
            }}
            pagination={{clickable: true}}
            onSwiper={(swiper) => console.log(swiper)}
        >
            <SwiperSlide><img src={mainImage}/></SwiperSlide>
            <SwiperSlide><img src={mainImage}/></SwiperSlide>
            <SwiperSlide><img src={mainImage}/></SwiperSlide>
            <SwiperSlide><img src={mainImage}/></SwiperSlide>
        </Swiper>
    )
}