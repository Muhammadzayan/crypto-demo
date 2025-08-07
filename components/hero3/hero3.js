import React from 'react';
import Link from 'next/link';
import pepeCoinImg from '/assets/frontend/public/images/shapes/shape_pepecoin_1.webp';
import leafImg1 from '/assets/frontend/public/images/shapes/shape_leaf_1.webp';
import leafImg2 from '/assets/frontend/public/images/shapes/shape_leaf_2.webp';
import leafImg3 from '/assets/frontend/public/images/shapes/shape_leaf_3.webp';
import leafImg4 from '/assets/frontend/public/images/shapes/shape_leaf_4.webp';
import cloudImg from '/assets/frontend/public/images/shapes/shape_cloud_1.png';
import treeImg from '/assets/frontend/public/images/shapes/shape_tree_1.webp';
import Image from 'next/image';

const Hero3 = () => {

  return (
    <section className="pepecoin_hero_section section_decoration bg-primary">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="hero_title text-uppercase" data-aos="fade-up" data-aos-duration="800">
              The Bright Future of <mark>$PEPE</mark>
            </h1>
            <p className="hero_description" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
              The most memeable memecoin in existence. The Dogs have had their day, it’s time for pepe to take reign.
            </p>
            <ul className="btns_group unordered_list p-0" data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
              <li>
                <Link className="pepecoin_btn text-dark" href="/token">
                  <span className="btn_label">Buy Now</span>
                  <span className="btn_bg">
                    <svg viewBox="0 0 180 62" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.08526 12.4119C-0.482482 6.10381 4.29004 0 10.79 0H169.211C175.711 0 180.484 6.10384 178.916 12.4119L175.495 26.1761C174.708 29.3439 174.708 32.6561 175.495 35.8239L178.916 49.5881C180.484 55.8962 175.711 62 169.211 62H10.79C4.29004 62 -0.48248 55.8962 1.08526 49.5881L4.50607 35.8238C5.29333 32.6561 5.29333 29.3439 4.50607 26.1762L1.08526 12.4119Z" fill="#FBE354"/>
                    </svg>
                  </span>
                </Link>
              </li>
              <li>
                <Link className="pepecoin_btn text-dark" href="/about">
                  <span className="btn_label">Learn More</span>
                  <span className="btn_bg">
                    <svg viewBox="0 0 196 62" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.446196 12.6322C-1.28952 6.27057 3.49938 0 10.0936 0H185.906C192.5 0 197.289 6.27059 195.553 12.6322L191.978 25.7355C191.037 29.1822 191.037 32.8178 191.978 36.2645L195.553 49.3678C197.289 55.7294 192.5 62 185.906 62H10.0936C3.49938 62 -1.28952 55.7294 0.446193 49.3678L4.02134 36.2644C4.96171 32.8178 4.96172 29.1822 4.02134 25.7356L0.446196 12.6322Z" fill="#FFFFFF"/>
                    </svg>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <div className="pepecoin_hero_image position-relative">
              <div className="pepe_coin_image">
                <Image src={pepeCoinImg} alt="Pepe Coin" />
              </div>
              <div className="hero_image_1">
                <Image src={leafImg3} alt="Leaf" />
              </div>
              <div className="hero_image_2">
                <Image src={leafImg2} alt="Leaf" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="decoration_item shape_leaf_top">
        <Image src={leafImg1} alt="Leaf" />
      </div>
      <div className="decoration_item shape_leaf_bottom">
        <Image src={leafImg4} alt="Leaf" />
      </div>
      <div className="decoration_item shape_cloud">
        <Image src={cloudImg} alt="Cloud" />
      </div>
      <div className="decoration_item shape_tree">
        <Image src={treeImg} alt="Tree" />
      </div>
    </section>
  );
};

export default Hero3;
