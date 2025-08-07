import React from 'react';
import Link from 'next/link';
import ContactForm from '../ContactFrom/ContactForm';

const ContactSection = () => {

    return (
        <section className="contact_section section_space pt-0">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="comment_form mb-0">
                            <h3 className="details_info_title">
                                Send Us a Message
                            </h3>
                            <p>
                                Got a question? Fill out the form, and we’ll get back to you shortly!
                            </p>
                            <ContactForm />
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="contact_info_box">
                            <ul className="contact_info_list unordered_list_block">
                                <li>
                                    <Link href="/contact">
                                        <span className="icon">
                                            <i className="fa-solid fa-phone-volume"></i>
                                        </span>
                                        <span className="label">+(1) 1230 452 8597</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact">
                                        <span className="icon">
                                            <i className="fa-solid fa-envelope"></i>
                                        </span>
                                        <span className="label">Coinlye@example.com</span>
                                    </Link>
                                </li>
                            </ul>
                            <ul className="social_block style_4 unordered_list">
                                <li>
                                    <Link href="/contact">
                                        <i className="fa-brands fa-facebook-f"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact">
                                        <i className="fa-brands fa-twitter"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact">
                                        <i className="fa-brands fa-linkedin-in"></i>
                                    </Link>
                                </li>
                            </ul>
                            <hr />
                            <ul className="iconlist_block unordered_list_block">
                                <li>
                                    <span className="iconlist_label">
                                        United States Office
                                        <small className="iconlist_info">
                                            Sunshine example park, Floor No 05A, Sector-94,
                                        </small>
                                    </span>
                                </li>
                                <li>
                                    <span className="iconlist_label">
                                        United Kingdom Office
                                        <small className="iconlist_info">
                                            12 Buckingham Rd, example Thwaite, HG3 4 TY, UK Contact
                                        </small>
                                    </span>
                                </li>
                            </ul>
                            <hr />
                            <ul className="iconlist_block unordered_list_block">
                                <li>
                                    <span className="iconlist_label">
                                        Our Office Open Time
                                        <small className="iconlist_info d-block">
                                            Mon - Sat: 08.00 AM - 05.00 PM
                                        </small>
                                        <small className="iconlist_info d-block">
                                            Sunday: Closed
                                        </small>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="gmap_canvas">
                    <iframe
                        src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        title="Google Map"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
