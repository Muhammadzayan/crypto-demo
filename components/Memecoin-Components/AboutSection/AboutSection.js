import React, { useState } from 'react'
import ModalVideo from 'react-modal-video'

// Import images
import aboutMemecoinImage from '/assets/frontend/public/images/about/about_memecoin.png';
import aboutMemecoin2Image from '/assets/frontend/public/images/about/about_memecoin_2.png';
import shapeNetImage from '/assets/frontend/public/images/shapes/shape_net.svg';
import Image from 'next/image';

const AboutSection = () => {

    const [isOpen, setOpen] = useState(false)

    return (
        <section id="id_about_memecoin_section" className="about_memecoin_section section_space section_decoration">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="memecoin_heading_block mb-0" data-aos="fade-up" data-aos-duration="800">
                            <h2 className="heading_text text-uppercase">
                                Introducing 👀 the <mark>meme</mark> coin
                            </h2>
                            <p className="heading_description mb-0 pe-lg-5">
                                The Meme Coin blends fun, community, and value in crypto! More than just a token, it’s a movement driven by creativity and innovation. Join the revolution and reshape meme culture!
                            </p>
                        </div>
                        <div className="image_block" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                            <Image src={aboutMemecoinImage} alt="Cartoon" />
                        </div>
                    </div>
                    <div className="col-lg-6 text-lg-center">
                        <div className="meme_popup_video_area">
                            <div className="meme_video_popup" data-aos="fade-up" data-aos-duration="800">
                                <h3 className="title_text text-uppercase text-start mb-0">
                                    It’s a <mark>Meme</mark> Coinlye!
                                </h3>
                                <button className="video_popup_block" onClick={() => setOpen(true)}>
                                    <i className="fa-solid fa-play"></i>
                                </button>
                            </div>
                            <div className="image_block" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                                <Image src={aboutMemecoin2Image} alt="Cartoon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="decoration_item shape_net_top">
                <Image src={shapeNetImage} alt="Shape Net" />
            </div>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="7e90gBu4pas" onClose={() => setOpen(false)} />

        </section>
    );
};

export default AboutSection;
