import React, { useState, useEffect } from 'react';
import NavLink from 'next/link'
import Logo from '/assets/frontend/public/images/site_logo/site_logo_1.svg'
import MobileMenu4 from '../MobileMenu4/MobileMenu4';
import Image from 'next/image';

const Header4 = (props) => {

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

        <header className={`site_header  ${isSticky ? 'sticky' : ''}`}>
            <div className="nav_wrapper">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-5 d-flex align-items-center">
                            <div className="site_logo">
                                <NavLink className="site_link" href="/" onClick={ClickHandler}>
                                    <Image loading="lazy" src={Logo} alt="ICO Site Logo" />
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-lg-6 col-2">
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
                                            <NavLink onClick={ClickHandler} href="/about">
                                                <span className="nav_link_label" data-text="About ICO">About Us</span>
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink onClick={ClickHandler} href="/token">
                                                <span className="nav_link_label" data-text="Token">Token</span>
                                            </NavLink>
                                        </li>
                                        <li className="dropdown">
                                            <NavLink onClick={ClickHandler} className="nav-link" href="/" id="help_submenu" aria-expanded="false">
                                                <span className="nav_link_label" data-text="Help">Help</span>
                                                <span className="nav_link_icon">
                                                    <i className="fa-solid fa-angle-down"></i>
                                                </span>
                                            </NavLink>
                                            <ul className="dropdown-menu" aria-labelledby="help_submenu">
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
                                        <li>
                                            <NavLink onClick={ClickHandler} className="nav-link" href="/contact">
                                                <span className="nav_link_label" data-text="Contact">Contact</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <MobileMenu4/>
                                </div>
                            </nav>
                        </div>
                        <div className="col-lg-3 col-5">
                            <ul className="btns_group unordered_list p-0 justify-content-end">
                                <li className="d-lg-none">
                                    <button className="mobile_menu_btn" type="button" data-bs-toggle="collapse" data-bs-target="#main_menu_dropdown" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setMobailState(!mobailActive)}>
                                        <i className="far fa-bars"></i>
                                    </button>
                                </li>
                                <li>
                                    <NavLink onClick={ClickHandler} className="ico_btn_outline" href="/sign_in">
                                        <span className="btn_icon">
                                            <i className="fa-solid fa-user"></i>
                                        </span>
                                        <span className="btn_label">Login</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header4;