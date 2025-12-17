import React from 'react';
import Banner from '../Banner/Banner';
import Feature from '../Features/Features';
import HowItWorks from '../HowItWorks/HowItWorks';
import Testimonials from '../Testimonials/Testimonials';
import SafetyTips from '../SafetyTips/SafetyTips';
import AllIssues from '../../AllIssuesPage/AllIssues';
import ResolvedIssues from '../ResolvedIssues/ResolvedIssues';

const Home = () => {
    return (
        <div>
            <Banner />
            <Feature />
            <ResolvedIssues></ResolvedIssues>
            <HowItWorks />
            <SafetyTips />
            <Testimonials />
        </div>
    );
};

export default Home;
