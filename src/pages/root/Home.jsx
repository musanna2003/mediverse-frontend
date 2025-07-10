import React from 'react';
import Slider from '../../components/Home_component/Slider';
import CategoryCardSection from '../../components/Home_component/CategoryCardSection';
import StatisticSection from '../../components/Home_component/StatisticSection';
import DiscountProducts from '../../components/Home_component/DiscountProducts';
import WhyChooseUs from '../../components/Home_component/WhyChooseUs';

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