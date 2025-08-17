import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Card from '../Card';
import axios from 'axios';

const DiscountProducts = () => {
    const [discountedProducts, setDiscountedProducts] = useState([]);

    useEffect(() => {
        const fetchDiscountedProducts = async () => {
            try {
                const res = await axios.get('https://ph-assignment-12-backend.vercel.app/products', {
                    params: { offer: true },
                });
                setDiscountedProducts(res.data);
            } catch (error) {
                console.error('Error fetching discounted products:', error);
            }
        };

        fetchDiscountedProducts();
    }, []);

    return (
        <section className="px-4 md:px-10 bg-base-100">
            <h2 className="text-3xl font-bold text-center mb-8">Discount Products</h2>
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 3, spaceBetween: 40 },
                        1024: { slidesPerView: 4, spaceBetween: 50 },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {discountedProducts.map((medicine) => (
                        <SwiperSlide key={medicine._id}>
                            <Card medicine={medicine} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default DiscountProducts;