import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { useQuery,  } from '@tanstack/react-query';
import Hero from './Hero';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed
import Bannar from './Bannar.jsx';

const Slider = () => {


    const { data: ads = [], isLoading } = useQuery({
        queryKey: ['banner-ads'],
        queryFn: async () => {
        const res = await axiosSecure.get('https://ph-assignment-12-backend.vercel.app/admin/offer-requests');
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
            {
                ads
                    .filter(ad => ad.isActive) // ✅ Only include ads where isActive === true
                    .map((ad, index) => (
                        <SwiperSlide key={index}>
                            <Bannar img={ad.image} txt={ad.description} />
                        </SwiperSlide>
                    ))
            }
        </Swiper>
    );
};

export default Slider;