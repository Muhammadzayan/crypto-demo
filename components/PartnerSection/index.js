import React from "react";
import Slider from "react-slick";
import Link from 'next/link'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pimg1 from '/assets/frontend/public/images/partners/partner_logo_1.svg'
import pimg2 from '/assets/frontend/public/images/partners/partner_logo_2.svg'
import pimg3 from '/assets/frontend/public/images/partners/partner_logo_3.svg'
import pimg4 from '/assets/frontend/public/images/partners/partner_logo_4.svg'
import pimg5 from '/assets/frontend/public/images/partners/partner_logo_5.svg'
import pimg6 from '/assets/frontend/public/images/partners/partner_logo_6.svg'
import pimg7 from '/assets/frontend/public/images/partners/partner_logo_5.svg'
import Image from "next/image";

const partners = [
    {
        pImg: pimg1,
    },
    {
        pImg: pimg2,
    },
    {
        pImg: pimg3,
    },
    {
        pImg: pimg4,
    },
    {
        pImg: pimg5,
    },
    {
        pImg: pimg6,
    },
    {
        pImg: pimg7,
    },
    {
        pImg: pimg2,
    },
]

var settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,

    responsive: [
        {
            breakpoint: 1700,
            settings: {
                slidesToShow: 7,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 1199,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 450,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 340,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
    ]
};



const PartnerSection = (props) => {

    return (
        <section className="partner_section">
            <div className="container-fluid">
                <div className="ico_heading_block text-center">
                    <h2 className="highlight_title mb-0" data-aos="fade-up" data-aos-duration="600">
                        Our top Partner
                    </h2>
                </div>
                <div className="partner_logo_carousel z-2 position-relative" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
                    <Slider {...settings}>
                        {partners.map((partner, pitem) => (
                            <div className="ico_partner_logo" key={pitem}>
                                <Link className="logo_wrap" href="/" >
                                <Image src={partner.pImg} alt="Partner Logo"/>
                                    <span className="dot_1"></span>
                                    <span className="dot_2"></span>
                                    <span className="dot_3"></span>
                                    <span className="dot_4"></span>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default PartnerSection;