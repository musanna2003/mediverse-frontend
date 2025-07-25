import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { useQuery,  } from '@tanstack/react-query';
import axios from 'axios';
import Hero from './Hero';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const Slider = () => {


    const { data: ads = [], isLoading } = useQuery({
        queryKey: ['banner-ads'],
        queryFn: async () => {
        const res = await axiosSecure.get('http://localhost:3000/admin/offer-requests');
        console.log(res.data)
        return res.data;
        
        }
    });
    
    if (isLoading) return <div>Loading...</div>;

    return (
        <Swiper navigation={true}
        modules={[Navigation, Autoplay]} // include Autoplay
        loop={true} // for infinite scroll
        autoplay={{
            delay: 3000, // time in ms between slides (3 seconds)
            disableOnInteraction: false,
        }}
        className="z-0">
            <SwiperSlide><img className=' w-full max-h-[95vh]' src="https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg " alt="" /></SwiperSlide>
            {
                ads
                    .filter(ad => ad.isActive) // ✅ Only include ads where isActive === true
                    .map((ad, index) => (
                        <SwiperSlide key={index}>
                            <Hero img={ad.image} txt={ad.description} />
                        </SwiperSlide>
                    ))
            }
        </Swiper>
    );
};

export default Slider;