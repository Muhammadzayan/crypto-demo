import React from 'react';
import roadmapImage from '/assets/frontend/public/images/shapes/shape_sign_board_3.webp';
import treeImage from '/assets/frontend/public/images/shapes/shape_tree_1.webp';
import stoneImage from '/assets/frontend/public/images/shapes/shape_stone_2.webp';
import cartoonImage from '/assets/frontend/public/images/shapes/shape_cartoon_13.webp';
import treeWoodImage from '/assets/frontend/public/images/shapes/shape_cartoon_9.webp';
import pepeCoinImage from '/assets/frontend/public/images/shapes/shape_pepecoin_1.webp';
import Image from 'next/image';

const roadmapPhases = [
  { text: 'Phase 1: Meme', animation: 'fade-right', delay: 100 },
  { text: 'Phase 2: Vibe and HODL', animation: 'fade-left', delay: 200 },
  { text: 'Phase 3: Meme Takeover', animation: 'fade-right', delay: 300 },
];


const RoadmapSection = () => {
  return (
    <section className="pepecoin_roadmap_section section_space pb-0 section_decoration" id='id_pepecoin_roadmap_section'>
      <div className="container">
        <div className="pepecoin_heading_block text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="heading_text text-uppercase mb-0 text-white">Roadmap</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-7 position-relative">
            <ul className="pepecoin_roadmap_list unordered_list_block text-center text-uppercase">
              {roadmapPhases.map((phase, index) => (
                <li
                  key={index}
                  data-aos={phase.animation}
                  data-aos-duration="800"
                  data-aos-delay={phase.delay}
                >
                  {phase.text}
                </li>
              ))}
            </ul>
            <div className="pepecoin_roadmap_image">
              <Image src={roadmapImage} alt="Board" />
            </div>
          </div>
        </div>
      </div>
      <div className="decoration_item shape_tree" data-aos="fade-right" data-aos-duration="800" data-aos-delay="200">
        <Image src={treeImage} alt="Tree"/>
      </div>
      <div className="decoration_item shape_stone">
        <Image src={stoneImage} alt="Stone"/>
      </div>
      <div className="decoration_item shape_cartoon_1" data-aos="fade-right" data-aos-duration="800">
        <Image src={cartoonImage} alt="Stone"/>
      </div>
      <div className="decoration_item shape_tree_wood">
        <Image src={treeWoodImage} alt="Tree Wood"/>
      </div>
      <div className="decoration_item pepe_coin_image">
        <Image src={pepeCoinImage} alt="Pepe Coin"/>
      </div>
    </section>
  );
};

export default RoadmapSection;
