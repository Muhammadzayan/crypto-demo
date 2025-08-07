import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

const roadmapStages = [
  {
    stage: 1,
    title: 'Foundation',
    items: [
      'Develop concept and smart contracts.',
      'Launch website and social media.',
      'Build an active community.'
    ]
  },
  {
    stage: 2,
    title: 'Launch',
    items: [
      'Start ICO and secure exchange listings.',
      'Run marketing campaigns.',
      'Partner with influencers and creators.'
    ]
  },
  {
    stage: 3,
    title: 'Growth',
    items: [
      'Introduce meme NFT marketplace.',
      'Enable payments with MemeCoin.',
      'Expand exchange listings.'
    ]
  },
  {
    stage: 4,
    title: 'Expansion',
    items: [
      'Launch a mobile wallet app.',
      'Enable decentralized governance.',
      'Partner with global merchants.'
    ]
  },
  {
    stage: 5,
    title: 'Sustainability',
    items: [
      'Offer staking rewards.',
      'Expand ecosystem partnerships.',
      'Adapt based on community feedback.'
    ]
  }
];

const RoadmapSection = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="id_meme_roadmap_section" className="meme_roadmap_section section_space">
      <div className="container">
        <div className="memecoin_heading_block text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="heading_text text-uppercase mb-0">Our Roadmap</h2>
        </div>

        <div className="meme_roadmap_carousel">
          {isClient && (
            <Swiper
              loop={true}
              spaceBetween={30}
              grabCursor={false}
              centeredSlides={true}
              breakpoints={{
                0: { slidesPerView: 1 },
                991: { slidesPerView: 2 },
                1025: { slidesPerView: 3 },
              }}
            >
              {roadmapStages.map((stage, index) => (
                <SwiperSlide key={index}>
                  <div className="meme_roadmap_block">
                    <div className="serial_number text-uppercase">Stage: {stage.stage}</div>
                    <div className="roadmap_info">
                      <h3 className="roadmap_title text-uppercase">{stage.title}</h3>
                      <ul className="iconlist_block unordered_list_block">
                        {stage.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <span className="iconlist_icon">
                              <i className="fa-regular fa-square-check"></i>
                            </span>
                            <span className="iconlist_label">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
