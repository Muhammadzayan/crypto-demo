import React from 'react';
import icon1 from '/assets/frontend/icons/icon_dollar_2.svg';
import icon2 from '/assets/frontend/icons/icon_bank_building.svg';
import icon3 from '/assets/frontend/icons/icon_scan.svg';
import icon4 from '/assets/frontend/public/images/services/icon_pinpoint.png';
import shape1 from '/assets/frontend/public/images/shapes/shape_section_divider_1.svg';
import sImg from '/assets/frontend/public/images/services/ico_service_image.webp';
import shape2 from '/assets/frontend/public/images/shapes/shape_poligon.svg';
import Image from 'next/image';


const services = [
  {
    icon: icon1,
    title: 'Universal ATM',
    description: 'ATM for stable currency unicast any other currencies.',
    delay: 200,
  },
  {
    icon: icon2,
    title: 'Smart Banking Branch',
    description: 'KYC handles lender negotiation or insurance procedures.',
    delay: 300,
  },
  {
    icon: icon3,
    title: 'Automation',
    description: 'Payment of invoices, create, deposited or integration for betting offices.',
    delay: 400,
  },
  {
    icon: icon4,
    title: 'Decentralization',
    description: 'All transactions are in a blockchain, each machine is a network builder.',
    delay: 500,
  },
];

const ChooseSection = () => {
  return (
    <section id="id_ico_service_section" className="ico_service_section section_space pb-0 section_decoration section_shadow_top">
      <div className="decoration_item shape_divider_1">
        <Image src={shape1} alt="Shape Divider" />
      </div>

      <div className="container">
        <div className="ico_heading_block text-center mt-lg-4" data-aos="fade-up" data-aos-duration="600">
          <h2 className="heading_text mb-0">Why You Choose Coinlye?</h2>
        </div>

        <div className="row m-lg-0 justify-content-center">
          <div className="col-lg-4 p-lg-0" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
            <div className="ico_service_image">
              <Image src={sImg} alt="ICO Service Icon" />
            </div>
          </div>
          {services.map((service, index) => (
            <div key={index} className={`col-lg-4 p-lg-0 ${index === 0 ? 'order-lg-first' : ''}`} data-aos="fade-up" data-aos-duration="600" data-aos-delay={service.delay}>
              <div className="ico_iconbox_block">
                <div className="iconbox_icon">
                  <Image src={service.icon} alt={service.title} />
                </div>
                <div className="iconbox_info">
                  <h3 className="iconbox_title">{service.title}</h3>
                  <p className="iconbox_description mb-0">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="decoration_item shape_shadow_1">
        <Image src={shape2} alt="Shape Color Shadow" />
      </div>
      <div className="decoration_item shape_shadow_2">
        <Image src={shape2} alt="Shape Color Shadow" />
      </div>
    </section>
  );
};

export default ChooseSection;
