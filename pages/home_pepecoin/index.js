import React, { Fragment } from 'react';
import Header3 from '../../components/header3/Header3';
import Hero3 from '../../components/hero3/hero3';
import AboutPepe from '../../components/Pepecoin-Components/about/about';
import FeaturesSection from '../../components/Pepecoin-Components/FeaturesSection/FeaturesSection';
import TokenomicsSection from '../../components/Pepecoin-Components/TokenomicsSection/TokenomicsSection';
import RoadmapSection from '../../components/Pepecoin-Components/RoadmapSection/RoadmapSection';
import Footer from '../../components/Pepecoin-Components/Footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';


const HomePage3 = () => {

    return (
        <Fragment>
            <div className='index_pepecoin page_wrapper'>
                <Header3 />
                <main className="page_content">
                    <Hero3 />
                    <AboutPepe />
                    <FeaturesSection />
                    <TokenomicsSection />
                    <RoadmapSection /> 
                </main>
                <Footer />
                <Scrollbar />
            </div>
        </Fragment>
    )
};
export default HomePage3;