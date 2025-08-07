import React from 'react';
import Link from 'next/link';
import shape1 from '/assets/frontend/public/images/shapes/shape_tree_1.webp';
import shape2 from '/assets/frontend/public/images/shapes/shape_stone_1.webp';
import shape3 from '/assets/frontend/public/images/shapes/shape_dragonfly.png';
import shape4 from '/assets/frontend/public/images/shapes/shape_cartoon_11.webp';
import Image from 'next/image';


const steps = [
  {
    number: '01',
    title: 'Create a Wallet',
    description:
      'Download Metamask or your wallet of choice from the app store or Google Play store for free. Desktop users, download the Google Chrome extension by going to metamask.io.',
  },
  {
    number: '02',
    title: 'Get Some ETH',
    description:
      'Have ETH in your wallet to switch to $PEPE. If you don’t have any ETH, you can buy directly on Metamask, transfer from another wallet, or buy on another exchange and send it to your wallet.',
  },
  {
    number: '03',
    title: 'Go to Uniswap',
    description:
      'Go to app.uniswap.org on Chrome or your Metamask browser. Connect your wallet, paste the $PEPE token address, select Pepe, and confirm. Sign the wallet prompt in Metamask to complete.',
  },
  {
    number: '04',
    title: 'Switch ETH for $PEPE',
    description:
      'Switch ETH for $PEPE. We have ZERO taxes so you don’t need to worry about buying with a specific slippage, although you may need to use slippage during times of market volatility.',
  },
];

const FeaturesSection = () => {

  const ClickHandler = () => {
    window.scrollTo(10, 0);
}

  return (
    <section className="pepecoin_feature_section section_space pb-0 z-2 section_decoration" id='id_pepecoin_feature_section'>
      <div className="container">
        <div className="pepecoin_heading_block text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="heading_text text-uppercase mb-0">How To Buy</h2>
        </div>
        <div className="row">
          {steps.map((step, index) => (
            <div
              className="col-lg-6"
              key={index}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={`${(index + 1) * 100}`}
            >
              <div
                className="pepecoin_feature_block"
                style={{ backgroundImage: `url(${'/images/shapes/pepecoin_feature_bg_image_1.webp'})` }}
              >
                <div
                  className="feature_serial_number"
                  style={{ backgroundImage: `url(${'/images/shapes/shape_cloud_1.png'})` }}
                >
                  {step.number}
                </div>
                <div className="feature_info">
                  <h3 className="feature_title text-uppercase">{step.title}</h3>
                  <p className="mb-0">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="btns_group pb-0 mt-4 justify-content-center" data-aos="fade-up" data-aos-duration="800" data-aos-delay="500">
          <Link className="pepecoin_btn text-white" href="/token" onClick={ClickHandler}>
            <span className="btn_label">Buy Now</span>
            <span className="btn_bg">
              <svg viewBox="0 0 180 62" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.08526 12.4119C-0.482482 6.10381 4.29004 0 10.79 0H169.211C175.711 0 180.484 6.10384 178.916 12.4119L175.495 26.1761C174.708 29.3439 174.708 32.6561 175.495 35.8239L178.916 49.5881C180.484 55.8962 175.711 62 169.211 62H10.79C4.29004 62 -0.48248 55.8962 1.08526 49.5881L4.50607 35.8238C5.29333 32.6561 5.29333 29.3439 4.50607 26.1762L1.08526 12.4119Z" fill="#0B902B"></path>
              </svg>
            </span>
          </Link>
        </div>
      </div>
      <div className="shape_tree text-end" data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
        <Image src={shape1} alt="Tree" />
      </div>
      <div className="decoration_item shape_stone">
        <Image src={shape2} alt="Stone" />
      </div>
      <div className="decoration_item shape_dragonfly">
        <Image src={shape3} alt="Dragonfly" />
      </div>
      <div className="decoration_item shape_frog" data-aos="fade-right" data-aos-duration="800" data-aos-delay="100">
        <Image src={shape4} alt="Frog" />
      </div>
    </section>
  );
};

export default FeaturesSection;