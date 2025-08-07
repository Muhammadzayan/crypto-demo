import React, { Fragment } from 'react';
import Header from '../components/header/Header';
import Hero from '../components/hero/hero';
import PartnerSection from '../components/PartnerSection';
import About from '../components/about/about';
import SolutionSection from '../components/SolutionSection/SolutionSection';
import FeaturesSection from '../components/FeaturesSection/FeaturesSection';
import ChooseSection from '../components/ChooseSection/ChooseSection';
import CoinpaySections from '../components/TokenomicsSection/TokenomicsSection';
import RoadmapSection from '../components/RoadmapSection/RoadmapSection';
import TeamSection from '../components/TeamSection/TeamSection';
import WhitepaperSection from '../components/WhitepaperSection/WhitepaperSection';
import EventSection from '../components/EventsSection/EventsSection';
import FaqSection from '../components/FaqSection/FaqSection';
import Footer from '../components/footer/Footer';
import Scrollbar from '../components/scrollbar/scrollbar';


const HomePage = () => {

    return (
        <Fragment>
            <div className='index_ico page_wrapper'>
                <Header />
                <main className="page_content">
                    <Hero />
                    <PartnerSection />
                    <About />
                    <SolutionSection />
                    <FeaturesSection />
                    <ChooseSection />
                    <CoinpaySections />
                    <RoadmapSection />
                    <TeamSection />
                    <WhitepaperSection />
                    <EventSection />
                    <FaqSection /> 
                    <Scrollbar />
                </main>
                <Footer />
            </div>
        </Fragment>
    )
};
export default HomePage;