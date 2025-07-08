import React from 'react';
import Slider from '../components/Home/Slider';
import CategoryCardSection from '../components/Home/CategoryCardSection';
import StatisticSection from '../components/Home/StatisticSection';
import DiscountProducts from '../components/Home/DiscountProducts';
import WhyChooseUs from '../components/Home/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <CategoryCardSection></CategoryCardSection>
            <StatisticSection></StatisticSection>
            <DiscountProducts></DiscountProducts>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;