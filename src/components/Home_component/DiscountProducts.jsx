import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import Card from '../Card';

const DiscountProducts = () => {
    const medicine = {
        name: 'Paracetamol 500mg',
        description: 'Used to treat mild to moderate pain and reduce fever.',
        image: 'https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fmedicines%2FIMG-20231023-WA0193.jpg&w=640&q=100',
        price: 12,
        };

    return (
        <section className="py-10 px-4 md:px-10 bg-base-100">
            <h2 className="text-3xl font-bold text-center mb-8">Discount Products</h2>
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                    clickable: true,
                    }}
                    breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide><Card medicine={medicine}></Card></SwiperSlide>
                    <SwiperSlide><Card medicine={medicine}></Card></SwiperSlide>
                    <SwiperSlide><Card medicine={medicine}></Card></SwiperSlide>
                    <SwiperSlide><Card medicine={medicine}></Card></SwiperSlide>
                    <SwiperSlide><Card medicine={medicine}></Card></SwiperSlide>
                    <SwiperSlide><Card medicine={medicine}></Card></SwiperSlide>
                    <SwiperSlide><Card medicine={medicine}></Card></SwiperSlide>
                    <SwiperSlide><Card medicine={medicine}></Card></SwiperSlide>
                    
                </Swiper>
            </div>
        </section>
        
    );
};

export default DiscountProducts;