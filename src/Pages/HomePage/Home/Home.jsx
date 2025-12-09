import React from 'react';
import Banner from '../Banner/Banner';
import Feature from '../Features/Features';
import HowItWorks from '../HowItWorks/HowItWorks';
import Testimonials from '../Testimonials/Testimonials';
import SafetyTips from '../SafetyTips/SafetyTips';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Feature></Feature>
            <HowItWorks></HowItWorks>
            <SafetyTips></SafetyTips>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;