import React from 'react';
import { Link } from 'react-scroll'
import NavLink from 'next/link'
import shapeCartoon1 from '/assets/frontend/public/images/shapes/shape_cartoon_5.png';
import shapeCartoon2 from '/assets/frontend/public/images/shapes/shape_cartoon_6.png';
import shapeCartoon3 from '/assets/frontend/public/images/shapes/shape_cartoon_7.png';
import Image from 'next/image';

const Footer = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
}
  return (
    <footer className="meme_site_footer section_decoration">
      <div className="container">
        <h2
          className="footer_heading text-center text-uppercase"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          let’s buy a token
        </h2>
        <ul
          className="pagelist_block unordered_list justify-content-center text-uppercase"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          <li>
            <Link to="id_token_offer" spy={true} smooth={true} duration={500} offset={-100}>
              <span className="pagelist_label">Token Offer</span>
            </Link>
          </li>
          <li>
            <Link to="id_memecoin_service_section" spy={true} smooth={true} duration={500} offset={-100}>
              <span className="pagelist_label">Features</span>
            </Link>
          </li>
          <li>
            <Link to="id_token_offer" spy={true} smooth={true} duration={500} offset={-100}>
              <span className="pagelist_label">About Coinlye</span>
            </Link>
          </li>
          <li>
            <Link to="how_to_buy_memecoin_section" spy={true} smooth={true} duration={500} offset={-100}>
              <span className="pagelist_label">How to Buy</span>
            </Link>
          </li>
          <li>
            <Link to="id_meme_roadmap_section" spy={true} smooth={true} duration={500} offset={-100}>
              <span className="pagelist_label">Roadmap</span>
            </Link>
          </li>
          <li>
            <Link to="meme_tokenomics_section" spy={true} smooth={true} duration={500} offset={-100}>
              <span className="pagelist_label">Tokenomics</span>
            </Link>
          </li>
        </ul>
        <ul
          className="btns_group unordered_list justify-content-center pb-0"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="200"
        >
          <li>
            <NavLink className="memecoin_btn bg-white" href="/token" onClick={ClickHandler}>
              <span className="btn_label">Buy Now a Token</span>
              <span
                className="btn_bg"
                style={{ maskImage: `url(${'/images/shapes/btn_mask_bg.png'})` }}
              ></span>
            </NavLink>
          </li>
          <li>
            <NavLink className="memecoin_btn bg-light" href="/token" onClick={ClickHandler}>
              <span className="btn_label">Dextools Chart</span>
              <span
                className="btn_bg"
                style={{ maskImage: `url(${'/images/shapes/btn_mask_bg.png'})` }}
              ></span>
            </NavLink>
          </li>
        </ul>
        <div className="footer_bottom">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <p className="copyright_text m-0">
                Copyright© 2025 Coinlye. All rights reserved.
              </p>
            </div>
            <div className="col-lg-6">
              <ul className="social_block unordered_list justify-content-lg-end">
                <li>
                  <NavLink href="/home_memecoin">
                    <svg viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.1817 2.34636C10.5036 3.04236 7.14877 4.48456 2.11879 6.67146C1.30201 6.99576 0.873436 7.31296 0.834656 7.62286C0.768491 8.14806 1.42705 8.35476 2.32148 8.63456C2.44372 8.67336 2.57025 8.71206 2.69969 8.75516C3.58123 9.04066 4.76611 9.37506 5.38149 9.38796C5.9409 9.39946 6.56497 9.16986 7.25381 8.69916C11.9531 5.53206 14.379 3.93206 14.5314 3.89756C14.6393 3.87316 14.7888 3.84166 14.8894 3.93206C14.9901 4.02106 14.9801 4.19036 14.97 4.23626C14.9038 4.51326 12.3241 6.90826 10.9868 8.14806C10.5698 8.53416 10.2749 8.80826 10.2146 8.87136C10.0794 9.01056 9.94141 9.14396 9.80908 9.27176C8.98941 10.0581 8.37683 10.6494 9.84356 11.6137C10.5482 12.0772 11.1119 12.4604 11.6741 12.8421C12.2882 13.2597 12.9008 13.6758 13.6945 14.1953C13.8959 14.3273 14.0886 14.4636 14.2769 14.5971C14.9916 15.1065 15.6343 15.5628 16.4281 15.4911C16.8883 15.448 17.3656 15.0161 17.6072 13.726C18.1781 10.6752 19.3026 4.06836 19.5629 1.34476C19.5788 1.11856 19.5691 0.891358 19.5341 0.667358C19.5132 0.486458 19.425 0.320058 19.2868 0.201058C19.0812 0.0331581 18.7619 -0.002742 18.6182 0.000158001C17.9696 0.011558 16.9746 0.357458 12.1817 2.34636Z"></path>
                    </svg>
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/home_memecoin">
                    <svg viewBox="0 0 15 14" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.7876 14L9.31558 5.8405L9.32498 5.8482L14.2588 0H12.6101L8.59076 4.76L5.39902 0H1.07488L6.18362 7.6179L0.794922 14H2.44366L6.91214 8.7042L10.4635 14H14.7876ZM4.74576 1.2727L12.4234 12.7273H11.1168L3.43295 1.2727H4.74576Z"></path>
                    </svg>
                  </NavLink>
                </li>
                <li>
                  <NavLink href="/home_memecoin">
                    <i className="fa-brands fa-github"></i>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="decoration_item cartoon_shape_1">
        <Image src={shapeCartoon1} alt="Cartoon" />
      </div>
      <div className="decoration_item cartoon_shape_2">
        <Image src={shapeCartoon2} alt="Cartoon" />
      </div>
      <div className="decoration_item cartoon_shape_3">
        <Image src={shapeCartoon3} alt="Cartoon" />
      </div>
    </footer>
  );
};

export default Footer;
