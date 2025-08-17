import React from 'react';
import Slider from '../../components/Home_component/Slider';
import CategoryCardSection from '../../components/Home_component/CategoryCardSection';
import StatisticSection from '../../components/Home_component/StatisticSection';
import DiscountProducts from '../../components/Home_component/DiscountProducts';
import WhyChooseUs from '../../components/Home_component/WhyChooseUs';
import Hero from '../../components/Home_component/Hero';

const Home = () => {
    return (
        <div className='space-y-8'>
            <Hero></Hero>
            <CategoryCardSection></CategoryCardSection>
            <Slider></Slider>
            <StatisticSection></StatisticSection>
            <DiscountProducts></DiscountProducts>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;