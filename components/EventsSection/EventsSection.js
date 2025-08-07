import React from 'react';

// Import images
import eventImage1 from '/assets/frontend/public/images/events/event_image_1.webp';
import eventImage2 from '/assets/frontend/public/images/events/event_image_2.webp';
import eventImage3 from '/assets/frontend/public/images/events/event_image_3.webp';
import eventImage4 from '/assets/frontend/public/images/events/event_image_4.webp';
import shapeSectionDivider from '/assets/frontend/public/images/shapes/shape_section_divider_2.svg';
import shapePoligon from '/assets/frontend/public/images/shapes/shape_poligon.svg';
import Link from 'next/link';
import Image from 'next/image';

const events = [
  {
    id: 1,
    date: '24, Dec 2025',
    location: '139 W, 46th Street, Dubai',
    title: 'Blockchain Horizons The Future of Digital Finance.',
    imageUrl: eventImage4,
    ticketUrl: '/contact',
  },
  {
    id: 2,
    date: '24, Nov 2025',
    location: '139 W, 46th Street, Dubai',
    title: 'Digital Assets Forum Navigating the Crypto Landscape.',
    imageUrl: eventImage1,
    ticketUrl: '/contact',
  },
  {
    id: 3,
    date: '24, Nov 2025',
    location: 'New York, NY 10036, USA',
    title: 'Coinlye Impact Rising Stars in the Crypto Space.',
    imageUrl: eventImage2,
    ticketUrl: '/contact',
  },
  {
    id: 4,
    date: '24, Nov 2025',
    location: '139 W, 46th Street, Australia',
    title: 'Mining Matters Maximizing Returns in Crypto Mining.',
    imageUrl: eventImage3,
    ticketUrl: '/contact',
  },
];

const EventSection = () => {

  const ClickHandler = () => {
    window.scrollTo(10, 0);
}
  return (
    <section className="ico_event_section section_space pb-0 section_decoration mt-lg-5">
      <div className="container">
        <div className="ico_heading_block text-center mt-lg-5 pt-lg-5" data-aos="fade-up" data-aos-duration="800">
          <h2 className="heading_text mb-0">Our Upcoming Events</h2>
        </div>

        <div className="row">
          <div className="col-lg-6 order-lg-last">
            <ul className="event_loop_builder unordered_list_block">
              {events.slice(0, 1).map((event, index) => (
                <li key={event.id} data-aos="fade-up" data-aos-duration="800" data-aos-delay={`${100 * (index + 1)}`}>
                  <div className="event_card_block">
                    <Link onClick={ClickHandler} className="event_image" href={event.ticketUrl}>
                      <Image src={event.imageUrl} alt="Event" />
                    </Link>
                    <div className="event_date">
                      <i className="fa-solid fa-calendar-days"></i>
                      <span>{event.date}</span>
                    </div>
                    <div className="event_info">
                      <div className="event_location">
                        <i className="fa-regular fa-location-dot"></i>
                        {event.location}
                      </div>
                      <h3 className="event_title">
                        <Link onClick={ClickHandler} href={event.ticketUrl}>{event.title}</Link>
                      </h3>
                      <Link onClick={ClickHandler} className="ico_btn_link" href={event.ticketUrl}>
                        <span className="btn_label">Get a Tickets</span>
                        <span className="btn_icon">
                          <svg className="icon_arrow" viewBox="0 0 27 23" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.6558 2.19168L21.6997 10.3122C21.8061 10.4196 21.951 10.48 22.1022 10.48H25.2214C25.7248 10.48 25.9782 9.87238 25.6239 9.51478L17.58 1.39428C17.4736 1.28688 17.3287 1.22638 17.1775 1.22638H14.0583C13.5548 1.22638 13.3015 1.83398 13.6558 2.19168Z"></path>
                            <path d="M14.3861 13.4268H2.35637C1.35486 13.4268 0.542969 12.6149 0.542969 11.6134C0.542969 10.6118 1.35486 9.79996 2.35637 9.79996H14.3861C15.3876 9.79996 16.1995 10.6118 16.1995 11.6134C16.1995 12.6149 15.3876 13.4268 14.3861 13.4268Z"></path>
                            <path d="M25.6239 13.7117L17.58 21.8322C17.4736 21.9396 17.3287 22 17.1775 22H14.0583C13.5548 22 13.3015 21.3924 13.6558 21.0347L21.6997 12.9142C21.8061 12.8068 21.951 12.7464 22.1022 12.7464H25.2214C25.7248 12.7464 25.9782 13.354 25.6239 13.7117Z"></path>
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-6">
            <ul className="event_loop_builder unordered_list_block">
              {events.slice(1).map((event, index) => (
                <li key={event.id} data-aos="fade-up" data-aos-duration="800" data-aos-delay={`${100 * (index + 1)}`}>
                  <div className="event_block_left_image">
                    <Link onClick={ClickHandler} className="event_image" href={event.ticketUrl}>
                      <Image src={event.imageUrl} alt="Event" />
                      <span className="event_date">{event.date}</span>
                    </Link>
                    <div className="event_info">
                      <div className="event_location">
                        <i className="fa-regular fa-location-dot"></i>
                        {event.location}
                      </div>
                      <h3 className="event_title mb-0">
                        <Link onClick={ClickHandler} href={event.ticketUrl}>{event.title}</Link>
                      </h3>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="decoration_item shape_divider_1">
        <Image src={shapeSectionDivider} alt="Shape Divider" />
      </div>
      <div className="decoration_item shape_shadow_1">
        <Image src={shapePoligon} alt="Shape Color Shadow" />
      </div>
      <div className="decoration_item shape_shadow_2">
        <Image src={shapePoligon} alt="Shape Color Shadow" />
      </div>
    </section>
  );
};

export default EventSection;
