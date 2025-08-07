import React, { Fragment } from 'react';
import Header2 from '../../components/Header2/Header2';
import Hero2 from '../../components/hero2/hero2';
import TokenOffer from '../../components/Memecoin-Components/TokenOffer/TokenOffer';
import ChooseSection from '../../components/Memecoin-Components/ChooseSection/ChooseSection';
import AboutSection from '../../components/Memecoin-Components/AboutSection/AboutSection';
import ProcessSection from '../../components/Memecoin-Components/ProcessSection/ProcessSection';
import ElimentsSection from '../../components/Memecoin-Components/ElimentsSection/ElimentsSection';
import RoadmapSection from '../../components/Memecoin-Components/RoadmapSection/RoadmapSection';
import TokenomicsSection from '../../components/Memecoin-Components/TokenomicsSection/TokenomicsSection';
import FAQSection from '../../components/Memecoin-Components/FaqSection/FaqSection';
import Footer from '../../components/Memecoin-Components/Footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';


const HomePage = () => {

    return (
        <Fragment>
            <div className='index_memecoin page_wrapper'>
                <Header2 />
                <main className="page_content">
                    <Hero2 />
                    <TokenOffer />
                    <ChooseSection />
                    <AboutSection />
                    <ProcessSection />
                    <ElimentsSection />
                    <RoadmapSection />
                    <TokenomicsSection />
                    <FAQSection />
                </main>
                <Footer />
                <Scrollbar />
            </div>
        </Fragment>
    )
};
export default HomePage;