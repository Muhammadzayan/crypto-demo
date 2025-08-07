import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll'
import MobileMenu3 from '../MobileMenu3/MobileMenu3';
import NavLink from 'next/link'
import Logo from '/assets/frontend/public/images/site_logo/site_logo_3.svg'
import Logo2 from '/assets/frontend/public/images/site_logo/site_logo_4.svg'
import Image from 'next/image';

const Header3 = (props) => {

    const [mobailActive, setMobailState] = useState(false);

    const [isSticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <header className={`site_header header_pepecoin  ${isSticky ? 'sticky' : ''}`}>
            <div className="nav_wrapper">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-5 d-flex align-items-center">
                            <div className="site_logo">
                                <NavLink className="site_link" href="/" onClick={ClickHandler}>
                                    <Image loading="lazy" src={Logo} alt="ICO Site Logo" />
                                    <Image loading="lazy" src={Logo2} alt="ICO Site Logo" />
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-lg-9 col-7 d-flex align-items-center justify-content-end">
                            <nav className="main_menu navbar navbar-expand-lg">
                                <div className={`main_menu_inner collapse navbar-collapse justify-content-center ${mobailActive ? 'show' : ''}`} id="main_menu_dropdown">
                                    <ul className="main_menu_list unordered_list text-uppercase main-menu">
                                        <li className="dropdown">
                                            <NavLink onClick={ClickHandler} className="nav-link" href="/" id="homes_submenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span className="nav_link_label" data-text="Home">Home</span>
                                                <span className="nav_link_icon">
                                                    <i className="fa-solid fa-angle-down"></i>
                                                </span>
                                            </NavLink>
                                            <ul className="dropdown-menu" aria-labelledby="homes_submenu">
                                                <li>
                                                    <NavLink onClick={ClickHandler} className="dropdown-item" href="/home_ico">
                                                        <span className="nav_link_label">Coinlye ICO</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink onClick={ClickHandler} className="dropdown-item" href="/home_memecoin">
                                                        <span className="nav_link_label">Memecoin</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink onClick={ClickHandler} className="dropdown-item" href="/home_pepecoin">
                                                        <span className="nav_link_label">Pepecoin</span>
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link to="id_pepecoin_about_section" spy={true} smooth={true} duration={500} offset={-100} className="nav-link scrollspy_btn">
                                                <span className="nav_link_label" data-text="About">About</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="id_pepecoin_feature_section" spy={true} smooth={true} duration={500} offset={-100} className="nav-link scrollspy_btn">
                                                <span className="nav_link_label" data-text="How to buy">How to buy</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="id_pepecoin_tokenomics_section" spy={true} smooth={true} duration={500} offset={-100} className="nav-link scrollspy_btn">
                                                <span className="nav_link_label" data-text="Tokenomics">Tokenomics</span>
                                            </Link>
                                        </li>
                                        <li className="dropdown">
                                            <NavLink onClick={ClickHandler} className="nav-link" href="/" id="help_submenu" aria-expanded="false">
                                                <span className="nav_link_label" data-text="Help">Help</span>
                                                <span className="nav_link_icon">
                                                    <i className="fa-solid fa-angle-down"></i>
                                                </span>
                                            </NavLink>
                                            <ul className="dropdown-menu" aria-labelledby="help_submenu">
                                                <li>
                                                    <Link to="id_pepecoin_roadmap_section" spy={true} smooth={true} duration={500} offset={-100} className="dropdown-item scrollspy_btn">
                                                        <span className="nav_link_label" data-text="Roadmap">Roadmap</span>
                                                    </Link>
                                                </li>
                                                <li className="dropdown">
                                                    <NavLink onClick={ClickHandler} className="dropdown-item" href="/" id="blog_submenu" aria-expanded="false">
                                                        <span className="nav_link_label" data-text="Blog">Blog</span>
                                                        <span className="nav_link_icon">
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                    </NavLink>
                                                    <ul className="dropdown-menu" aria-labelledby="blog_submenu">
                                                        <li>
                                                            <NavLink onClick={ClickHandler} className="dropdown-item" href="/blog">
                                                                <span className="nav_link_label">Blogs</span>
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink onClick={ClickHandler} className="dropdown-item" href="/blog-single/How-Our-Unique-Tokenomics-Ensures-Sustainable-Growth-and-Value">
                                                                <span className="nav_link_label">Blog Details</span>
                                                            </NavLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <NavLink onClick={ClickHandler} className="dropdown-item" href="/contact">
                                                        <span className="nav_link_label">Help Center</span>
                                                    </NavLink>
                                                </li>
                                                <li className="dropdown">
                                                    <NavLink onClick={ClickHandler} className="dropdown-item" href="/" id="register_submenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <span className="nav_link_label" data-text="Blog">My Account</span>
                                                        <span className="nav_link_icon">
                                                            <i className="fa-solid fa-angle-right"></i>
                                                        </span>
                                                    </NavLink>
                                                    <ul className="dropdown-menu" aria-labelledby="register_submenu">
                                                        <li>
                                                            <NavLink onClick={ClickHandler} className="dropdown-item" href="/sign_in">
                                                                <span className="nav_link_label">Sign In</span>
                                                            </NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink onClick={ClickHandler} className="dropdown-item" href="/sign_up">
                                                                <span className="nav_link_label">Sign Up</span>
                                                            </NavLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <MobileMenu3 />
                                </div>
                            </nav>
                            <ul className="btns_group unordered_list p-0 justify-content-end">
                                <li className="d-lg-none">
                                    <button className="mobile_menu_btn text-white" type="button" data-bs-toggle="collapse" data-bs-target="#main_menu_dropdown" aria-expanded="false" aria-label="Toggle navigation"  onClick={() => setMobailState(!mobailActive)}>
                                        <i className="far fa-bars"></i>
                                    </button>
                                </li>
                                <li>
                                    <NavLink onClick={ClickHandler} className="pepecoin_btn text-dark"  href="/sign_in">
                                        <span className="btn_label">Buy Now</span>
                                        <span className="btn_bg">
                                            <svg viewBox="0 0 180 62" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.08526 12.4119C-0.482482 6.10381 4.29004 0 10.79 0H169.211C175.711 0 180.484 6.10384 178.916 12.4119L175.495 26.1761C174.708 29.3439 174.708 32.6561 175.495 35.8239L178.916 49.5881C180.484 55.8962 175.711 62 169.211 62H10.79C4.29004 62 -0.48248 55.8962 1.08526 49.5881L4.50607 35.8238C5.29333 32.6561 5.29333 29.3439 4.50607 26.1762L1.08526 12.4119Z" fill="#FBE354" />
                                            </svg>
                                        </span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        // <header >
        //     <div className="nav_wrapper">
        //         <div className="container">
        //             <div className="row align-items-center">
        //                 <div className="col-lg-3 col-5 d-flex align-items-center">
        //                     <div className="site_logo">

        //                     </div>
        //                 </div>
        //                 <div className="col-lg-9 col-7 d-flex align-items-center justify-content-end">
        //                     <nav className="main_menu navbar navbar-expand-lg">
        //                         <div className={`main_menu_inner collapse navbar-collapse justify-content-center ${mobailActive ? 'show' : ''}`} id="main_menu_dropdown">

        //                             <MobileMenu2 />

        //                             <ul className="btns_group unordered_list p-0 justify-content-end">
        //                                 <li className="d-lg-none">
        //                                     <button className="mobile_menu_btn text-white" type="button" data-bs-toggle="collapse" data-bs-target="#main_menu_dropdown" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setMobailState(!mobailActive)}>
        //                                         <i className="far fa-bars"></i>
        //                                     </button>
        //                                 </li>
        //                                 <li>
        //                                     <NavLink className="pepecoin_btn text-dark" href="/sign_in">
        //                                         <span className="btn_label">Buy Now</span>
        //                                         <span className="btn_bg">
        //                                             <svg viewBox="0 0 180 62" xmlns="http://www.w3.org/2000/svg">
        //                                                 <path d="M1.08526 12.4119C-0.482482 6.10381 4.29004 0 10.79 0H169.211C175.711 0 180.484 6.10384 178.916 12.4119L175.495 26.1761C174.708 29.3439 174.708 32.6561 175.495 35.8239L178.916 49.5881C180.484 55.8962 175.711 62 169.211 62H10.79C4.29004 62 -0.48248 55.8962 1.08526 49.5881L4.50607 35.8238C5.29333 32.6561 5.29333 29.3439 4.50607 26.1762L1.08526 12.4119Z" fill="#FBE354" />
        //                                             </svg>
        //                                         </span>
        //                                     </NavLink>
        //                                 </li>
        //                             </ul>
        //                         </div>
        //                     </nav>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </header>

    )
}

export default Header3;