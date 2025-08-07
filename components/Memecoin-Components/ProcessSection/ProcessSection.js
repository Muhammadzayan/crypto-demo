import React from "react";

// Import images
import cartoonImage from '/assets/frontend/public/images/shapes/shape_cartoon_4.png';
import crownImage from '/assets/frontend/public/images/shapes/shape_crown.png';
import ironmanReactorImage from '/assets/frontend/public/images/shapes/shape_ironman_reactor.svg';
import userInfoIcon from "/assets/frontend/icons/icon_user_info.svg";
import Link from 'next/link'
import Image from "next/image";

const processSteps = [
  {
    title: "Go to Buy page",
    description:
      "Visit the Buy page to purchase Meme Coinlye securely and join the crypto community today!",
    number: "1",
    delay: "100",
  },
  {
    title: "Connect your wallet",
    description:
      "Connect your wallet to securely access and manage your crypto, making transactions hassle-free!",
    number: "2",
    delay: "200",
  },
  {
    title: "Buy coinlye token",
    description:
      "Buy Coinlye Token now and join the growing community shaping the future of crypto!",
    number: "3",
    delay: "300",
  },
];

const ProcessSection = () => {
  
  const ClickHandler = () => {
    window.scrollTo(10, 0);
}

  return (
    <section
      id="how_to_buy_memecoin_section"
      className="meme_process_section section_space position-relative z-2"
      style={{ backgroundImage: `url(${'images/shapes/memecoin_bg_shape_3.svg'})` }}
    >
      <div className="container">
        <div
          className="meme_process_heading"
          style={{ backgroundImage: `url(${'images/shapes/shape_net_2.svg'})` }}
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-lg-7">
              <div className="memecoin_heading_block">
                <h2 className="heading_text text-uppercase">
                  How To Buy <mark>Meme</mark> Coinlye Token
                </h2>
                <p className="heading_description mb-0 pe-lg-5">
                  Set up a wallet, buy ETH/BNB, connect to a DEX, swap for Meme
                  Coinlye, and confirm the transaction.
                </p>
              </div>
              <Link className="memecoin_btn bg-white" href="/token" onClick={ClickHandler}>
                <span className="btn_label">Buy Now a Token</span>
                <span
                  className="btn_bg"
                  style={{ maskImage: `url(${'/images/shapes/btn_mask_bg.png'})` }}
                ></span>
              </Link>
            </div>
            <div className="col-lg-4">
              <div className="cartoon_image">
                <Image src={cartoonImage} alt="Meme Cartoon" />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {processSteps.map((step, index) => (
            <div
              className="col-lg-4"
              key={index}
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay={step.delay}
            >
              <div className="meme_progress_block">
                <h3 className="block_title text-uppercase">
                  <span className="icon">
                    <Image src={userInfoIcon} alt="User Info" />
                  </span>
                  <span className="title">{step.title}</span>
                </h3>
                <p className="mb-0">{step.description}</p>
                <div className="serial_number">
                  <span className="crown">
                    <Image src={crownImage} alt="Crown" />
                  </span>
                  <span className="number">{step.number}</span>
                  <span className="spin_bg">
                    <Image
                      src={ironmanReactorImage}
                      alt="Ironman Reactor"
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
