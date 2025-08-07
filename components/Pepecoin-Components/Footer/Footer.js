import React from 'react';
import Link from 'next/link';
import shapeSignBoard from '/assets/frontend/public/images/shapes/shape_sign_board_4.webp';
import shapeGround from '/assets/frontend/public/images/shapes/shape_send_ground.webp';
import shapeDragonfly from '/assets/frontend/public/images/shapes/shape_dragonfly.png';
import shapeTree from '/assets/frontend/public/images/shapes/shape_tree_1.webp';
import shapeCloud from '/assets/frontend/public/images/shapes/shape_cloud_2.png';
import Image from 'next/image';

const Footer = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  }

  return (
    <footer className="pepecoin_site_footer">
      <div className="container position-relative z-2">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="pepecoin_heading_block">
              <div className="row align-items-center mb-1">
                <div className="col-lg-7">
                  <h2 className="heading_text text-uppercase mb-0">
                    Contact
                  </h2>
                </div>
                <div className="col-lg-5">
                  <ul className="social_block style_3 unordered_list">
                    <li>
                      <Link href="/home_pepecoin" style={{ backgroundImage: `url(${'/images/shapes/shape_dot.png'})` }}>
                        <svg viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.1817 2.34636C10.5036 3.04236 7.14877 4.48456 2.11879 6.67146C1.30201 6.99576 0.873436 7.31296 0.834656 7.62286C0.768491 8.14806 1.42705 8.35476 2.32148 8.63456C2.44372 8.67336 2.57025 8.71206 2.69969 8.75516C3.58123 9.04066 4.76611 9.37506 5.38149 9.38796C5.9409 9.39946 6.56497 9.16986 7.25381 8.69916C11.9531 5.53206 14.379 3.93206 14.5314 3.89756C14.6393 3.87316 14.7888 3.84166 14.8894 3.93206C14.9901 4.02106 14.9801 4.19036 14.97 4.23626C14.9038 4.51326 12.3241 6.90826 10.9868 8.14806C10.5698 8.53416 10.2749 8.80826 10.2146 8.87136C10.0794 9.01056 9.94141 9.14396 9.80908 9.27176C8.98941 10.0581 8.37683 10.6494 9.84356 11.6137C10.5482 12.0772 11.1119 12.4604 11.6741 12.8421C12.2882 13.2597 12.9008 13.6758 13.6945 14.1953C13.8959 14.3273 14.0886 14.4636 14.2769 14.5971C14.9916 15.1065 15.6343 15.5628 16.4281 15.4911C16.8883 15.448 17.3656 15.0161 17.6072 13.726C18.1781 10.6752 19.3026 4.06836 19.5629 1.34476C19.5788 1.11856 19.5691 0.891358 19.5341 0.667358C19.5132 0.486458 19.425 0.320058 19.2868 0.201058C19.0812 0.0331581 18.7619 -0.002742 18.6182 0.000158001C17.9696 0.011558 16.9746 0.357458 12.1817 2.34636Z"></path>
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href="/home_pepecoin" style={{ backgroundImage: `url(${'/images/shapes/shape_dot.png'})` }}>
                        <svg viewBox="0 0 15 14" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14.7876 14L9.31558 5.8405L9.32498 5.8482L14.2588 0H12.6101L8.59076 4.76L5.39902 0H1.07488L6.18362 7.6179L0.794922 14H2.44366L6.91214 8.7042L10.4635 14H14.7876ZM4.74576 1.2727L12.4234 12.7273H11.1168L3.43295 1.2727H4.74576Z"></path>
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link href="/home_pepecoin" style={{ backgroundImage: `url(${'/images/shapes/shape_dot.png'})` }}>
                        <i className="fa-brands fa-github"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="heading_description mb-0">
                $pepe coin has no association with Matt Furie or his creation Pepe the Frog. This token is simply paying homage to a meme we all love and recognize.
              </p>
            </div>
            <div className="btns_group p-0 justify-content-center position-relative z-2">
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
        </div>
      </div>
      <div className="shape_sign_board">
        <Image src={shapeSignBoard} alt="Sign Board" />
      </div>
      <div className="shape_ground">
        <Image src={shapeGround} alt="Ground Shape" />
      </div>
      <div className="shape_dragonfly">
        <Image src={shapeDragonfly} alt="Dragonfly" />
      </div>
      <div className="shape_tree" data-aos="fade-left" data-aos-duration="800" data-aos-delay="100">
        <Image src={shapeTree} alt="Tree" />
      </div>
      <div className="shape_cloud">
        <Image src={shapeCloud} alt="Cloud" />
      </div>
      <div className="footer_bottom text-center">
        <p className="copyright_text m-0 text-uppercase text-white">
          Copyright© 2025 Coinlye. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
