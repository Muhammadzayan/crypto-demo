import React from 'react';
import { useState } from 'react';
import shape1 from '/assets/frontend/public/images/shapes/shape_circle_1.webp';
import shape2 from '/assets/frontend/public/images/shapes/shape_section_divider_2.svg';
import Image from 'next/image';

const roadmapData = [
  {
    badge: "Q1 - 2024",
    title: "Concept & Planning",
    items: [
      "Conduct in-depth analysis to identify market opportunities and challenges.",
      "Develop a clear and innovative concept tailored to industry needs.",
      "Prepare a comprehensive document detailing the project’s vision, goals, and tokenomics."
    ]
  },
  {
    badge: "Q2 - 2024",
    title: "Community Building",
    items: [
      "Connect with potential investors and users to create awareness.",
      "Leverage social platforms to grow the community and keep them informed.",
      "Offer rewards and bonuses to early supporters to build trust.",
      "Host AMAs and sessions to engage."
    ]
  },
  {
    badge: "Q3 - Q2 2025",
    title: "ICO Launch",
    items: [
      "Strong community interest and early investments that build momentum.",
      "Achieving target funding goals during the ICO period, project viability.",
      "Successful listing on major exchanges, increasing liquidity and user access.",
      "Key feature milestones achieved."
    ]
  },
  {
    badge: "Q4 - 2025",
    title: "Token Distribution",
    items: [
      "Tokens for public sale to investors.",
      "Allocate tokens for the team.",
      "Set aside tokens for future needs.",
      "Tokens will drive community and marketing efforts.",
      "Reward participants for promotion."
    ]
  }
];

const RoadmapSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  return (
    <section id="id_ico_roadmap_section" className="ico_roadmap_section section_space mt-lg-5 section_decoration">
      <div className="container">
        <div className="ico_heading_block text-center mt-lg-5 pt-lg-5" data-aos="fade-up" data-aos-duration="600">
          <h2 className="heading_text mb-0">Roadmap</h2>
        </div>

        <div className="ico_roadmap_flexbox" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
          {roadmapData.map((block, index) => (
            <div
              key={index}
              className={`roadmap_block ${activeIndex === index ? "active" : ""}`}
              onMouseOver={() => handleMouseOver(index)}
            >
              <div className="badge">{block.badge}</div>
              <h3 className="heading_text">{block.title}</h3>
              <ul className="iconlist_block unordered_list_block">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <span className="iconlist_icon">
                      <i className="fa-solid fa-circle"></i>
                    </span>
                    <span className="iconlist_label">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="hover_shape">
                <Image src={shape1} alt="Shape Circle" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="decoration_item shape_divider_1">
        <Image src={shape2} alt="Shape Divider" />
      </div>
    </section>
  );
};

export default RoadmapSection;