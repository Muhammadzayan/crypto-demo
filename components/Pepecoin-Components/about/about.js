import React from 'react';
import dotShape from '/assets/frontend/public/images/shapes/shape_dot.png';
import signBoard from '/assets/frontend/public/images/shapes/shape_sign_board.webp';
import dragonfly from '/assets/frontend/public/images/shapes/shape_dragonfly.png';
import wood1 from '/assets/frontend/public/images/shapes/shape_cartoon_9.webp';
import wood2 from '/assets/frontend/public/images/shapes/shape_cartoon_10.webp';
import tree from '/assets/frontend/public/images/shapes/shape_tree_1.webp';
import cloud from '/assets/frontend/public/images/shapes/shape_cloud_2.png';
import Image from 'next/image';

const AboutPepe = () => {
  return (
    <section id="id_pepecoin_about_section" className="pepecoin_about_section section_space pb-0 section_decoration mt-lg-5">
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-lg-9">
            <div className="pepecoin_about_content position-relative text-center">
              <div className="pepecoin_heading_block">
                <h2 className="heading_text text-uppercase" data-aos="fade-up" data-aos-duration="800">
                  <span className="shape_dot">
                    <Image src={dotShape} alt="Dot" />
                  </span>
                  About $Pepe
                  <span className="shape_dot">
                    <Image src={dotShape} alt="Dot" />
                  </span>
                </h2>
                <p className="heading_description mb-0" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                  Pepe is done watching the endless stream of derivative Inu coins. It’s time for the internet’s most iconic meme to reclaim the throne. $PEPE is here to make memecoins great again: stealth-launched, no presale, zero taxes, LP burnt, and contract renounced. Fueled by pure meme power, $PEPE is a coin for the people—forever.
                </p>
              </div>
              <div className="shape_board_image">
                <Image src={signBoard} alt="Board" />
              </div>
              <div className="shape_dragonfly" data-aos="fade-right" data-aos-duration="800" data-aos-delay="100">
                <Image src={dragonfly} alt="Dragonfly" />
              </div>
              <div className="shape_wood_1">
                <Image src={wood1} alt="Tree Wood" />
              </div>
              <div className="shape_wood_2">
                <Image src={wood2} alt="Tree Wood" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="decoration_item shape_tree">
        <Image src={tree} alt="Tree" />
      </div>
      <div className="decoration_item shape_cloud">
        <Image src={cloud} alt="Cloud" />
      </div>
    </section>
  );
};

export default AboutPepe;
