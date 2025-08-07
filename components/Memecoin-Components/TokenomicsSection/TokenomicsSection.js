import React from 'react';
import CountUp from 'react-countup';

// Import images
import presaleIcon from '/assets/frontend/public/images/shapes/shape_tokenomics_orange.png';
import liquidityIcon from '/assets/frontend/public/images/shapes/shape_tokenomics_pink.png';
import marketingIcon from '/assets/frontend/public/images/shapes/shape_tokenomics_light_green.png';
import communityIcon from '/assets/frontend/public/images/shapes/shape_tokenomics_light_blue.png';
import developmentIcon from '/assets/frontend/public/images/shapes/shape_tokenomics_light_yellow.png';
import teamIcon from '/assets/frontend/public/images/shapes/shape_tokenomics_light_pink.png';
import arrowIcon from '/assets/frontend/public/images/shapes/shape_arrow_right.png';
import casinoImage from '/assets/frontend/public/images/about/casino_image.png';
import Image from 'next/image';

const TokenomicsSection = () => {
    const benefits = [
        { iconClass: 'fa-solid fa-medal', title: 'Exclusive Rewards', delay: 100 },
        { iconClass: 'fa-solid fa-users', title: 'Community Influence', delay: 200 },
        { iconClass: 'fa-solid fa-database', title: 'Passive Earnings', delay: 300 },
        { iconClass: 'fa-solid fa-barcode-read', title: 'Access to Rare NFTs', delay: 400 },
    ];

    return (
        <section id='meme_tokenomics_section' className="meme_tokenomics_section" style={{ backgroundImage: `url(${'/images/shapes/memecoin_bg_shape_4.svg'})` }}>
            <div className="section_space">
                <div className="container">
                    <div className="memecoin_heading_block text-center" data-aos="fade-up" data-aos-duration="800">
                        <h2 className="heading_text text-uppercase mb-0">Tokenomics</h2>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="meme_tokenomics_distribution" data-aos="fade-right" data-aos-duration="800" data-aos-delay="100">
                                <h3 className="heading_text text-uppercase">Distribution:</h3>
                                <ul className="unordered_list_block">
                                    {[ 
                                        { title: 'Presale', percentage: 40, icon: presaleIcon },
                                        { title: 'Liquidity Pool', percentage: 25, icon: liquidityIcon },
                                        { title: 'Marketing & Partnerships', percentage: 15, icon: marketingIcon },
                                        { title: 'Community Rewards', percentage: 10, icon: communityIcon },
                                        { title: 'Development Fund', percentage: 5, icon: developmentIcon },
                                        { title: 'Team Allocation', percentage: 5, icon: teamIcon },
                                    ].map((item, index) => (
                                        <li key={index}>
                                            <div className="icon">
                                                <Image src={item.icon} alt={`Shape Tokenomics ${item.title}`} />
                                            </div>
                                            <div className="value">
                                                <span className="odometer" data-count={item.percentage}><CountUp end={item.percentage} enableScrollSpy scrollSpyOnce/></span>
                                                <span>%</span>
                                            </div>
                                            <div className="text">{item.title}</div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-2">
                            <div className="shape_arrow_right" data-aos="zoom-in" data-aos-duration="800" data-aos-delay="200">
                                <Image src={arrowIcon} alt="Icon Arrow Right" />
                            </div>
                        </div>

                        <div className="col-lg-5" data-aos="fade-left" data-aos-duration="800" data-aos-delay="300">
                            <p className="meme_tokenomics_total_supply text-center text-uppercase">TOTAL SUPPLY: 10,000,000,000 MEME</p>
                            <div className="casino_image">
                                <Image src={casinoImage} alt="Casino" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="meme_tokenomics_benefits">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="memecoin_heading_block text-center" data-aos="fade-up" data-aos-duration="800">
                                <h2 className="heading_text text-uppercase mb-0">
                                    <mark>Meme</mark> Token Holder Benefits
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="benefits_features">
                        <div className="benefits_circle" data-aos="fade-up" data-aos-duration="800">
                            <div className="percent">
                                <span className="odometer" data-count="30"><CountUp end={30} enableScrollSpy scrollSpyOnce/></span>
                                <span>%</span>
                            </div>
                            <h3 className="percent_title mb-0">Token Benefits</h3>
                        </div>

                        {benefits.map((benefit, index) => (
                            <div key={index} className={`benefits_feature_item_${index + 1}`} data-aos="fade-up" data-aos-duration="800" data-aos-delay={benefit.delay}>
                                <div className="icon">
                                    <i className={benefit.iconClass}></i>
                                </div>
                                <h3 className="title mb-0">{benefit.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TokenomicsSection;
