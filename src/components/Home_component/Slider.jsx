import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';

const Slider = () => {
    return (
        <Swiper navigation={true} modules={[Navigation]} className="z-0">
            <SwiperSlide><img className=' w-full max-h-[95vh]' src="https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg " alt="" /></SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
    );
};

export default Slider;