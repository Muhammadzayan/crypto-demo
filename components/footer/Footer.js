import React from 'react';
import shapeIconBottom from '/assets/frontend/public/images/shapes/shape_ico_hero_section_bottom.svg';
import { Link } from 'react-scroll'
import NavLink from 'next/link'
import Image from 'next/image';



const Footer = () => {

    const SubmitHandler = (e) => {
        e.preventDefault()
    }
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }
    return (
        <footer className="ico_site_footer section_decoration section_shadow_top">
            <div className="decoration_item shape_top">
                <Image src={shapeIconBottom} alt="Bottom Line Shape" />
            </div>
            <div className="container">
                <ul className="pagelist_block unordered_list justify-content-center text-uppercase">
                    <li>
                        <Link spy={true} smooth={true} duration={500} offset={-100} className="nav-link scrollspy_btn" to="id_ico_about_section">
                            <span className="pagelist_label">About ICO</span>
                        </Link>
                    </li>
                    <li>
                        <Link spy={true} smooth={true} duration={500} offset={-100} className="nav-link scrollspy_btn" to="id_ico_service_section">
                            <span className="pagelist_label">Features</span>
                        </Link>
                    </li>
                    <li>
                        <Link spy={true} smooth={true} duration={500} offset={-100} className="nav-link scrollspy_btn" to="id_ico_tokenomics_section">
                            <span className="pagelist_label">Tokenomics</span>
                        </Link>
                    </li>
                    <li>
                        <Link spy={true} smooth={true} duration={500} offset={-100} className="nav-link scrollspy_btn" to="id_ico_roadmap_section">
                            <span className="pagelist_label">Roadmap</span>
                        </Link>
                    </li>
                    <li>
                        <Link spy={true} smooth={true} duration={500} offset={-100} className="nav-link scrollspy_btn" to="id_ico_team_section">
                            <span className="pagelist_label">Team</span>
                        </Link>
                    </li>
                    <li>
                        <Link spy={true} smooth={true} duration={500} offset={-100} className="nav-link scrollspy_btn" to="id_ico_whitepaper_section">
                            <span className="pagelist_label">Whitepaper</span>
                        </Link>
                    </li>
                </ul>
                <div className="middle_area">
                    <div className="column">
                        <h3 className="footer_title text-uppercase">Join our social group</h3>
                        <ul className="social_block style_2 unordered_list justify-content-center">
                            <li>
                                <NavLink href="/">
                                    <svg viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.1817 2.34636C10.5036 3.04236 7.14877 4.48456 2.11879 6.67146C1.30201 6.99576 0.873436 7.31296 0.834656 7.62286C0.768491 8.14806 1.42705 8.35476 2.32148 8.63456C2.44372 8.67336 2.57025 8.71206 2.69969 8.75516C3.58123 9.04066 4.76611 9.37506 5.38149 9.38796C5.9409 9.39946 6.56497 9.16986 7.25381 8.69916C11.9531 5.53206 14.379 3.93206 14.5314 3.89756C14.6393 3.87316 14.7888 3.84166 14.8894 3.93206C14.9901 4.02106 14.9801 4.19036 14.97 4.23626C14.9038 4.51326 12.3241 6.90826 10.9868 8.14806C10.5698 8.53416 10.2749 8.80826 10.2146 8.87136C10.0794 9.01056 9.94141 9.14396 9.80908 9.27176C8.98941 10.0581 8.37683 10.6494 9.84356 11.6137C10.5482 12.0772 11.1119 12.4604 11.6741 12.8421C12.2882 13.2597 12.9008 13.6758 13.6945 14.1953C13.8959 14.3273 14.0886 14.4636 14.2769 14.5971C14.9916 15.1065 15.6343 15.5628 16.4281 15.4911C16.8883 15.448 17.3656 15.0161 17.6072 13.726C18.1781 10.6752 19.3026 4.06836 19.5629 1.34476C19.5788 1.11856 19.5691 0.891358 19.5341 0.667358C19.5132 0.486458 19.425 0.320058 19.2868 0.201058C19.0812 0.0331581 18.7619 -0.002742 18.6182 0.000158001C17.9696 0.011558 16.9746 0.357458 12.1817 2.34636Z" />
                                    </svg>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="/">
                                    <svg viewBox="0 0 15 14" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.7876 14L9.31558 5.8405L9.32498 5.8482L14.2588 0H12.6101L8.59076 4.76L5.39902 0H1.07488L6.18362 7.6179L0.794922 14H2.44366L6.91214 8.7042L10.4635 14H14.7876ZM4.74576 1.2727L12.4234 12.7273H11.1168L3.43295 1.2727H4.74576Z" />
                                    </svg>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink href="/">
                                    <i className="fa-brands fa-github"></i>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="column">
                        <h3 className="footer_title text-uppercase">Subscribe to our newsletter</h3>
                        <form className="ico_newsletter_form" onSubmit={SubmitHandler}>
                            <input type="email" name="email" placeholder="Enter your email" />
                            <button className="submit_btn" type="submit">Submit</button>
                        </form>
                    </div>
                    <div className="column">
                        <h3 className="footer_title text-uppercase">Let’s coinlye great together.</h3>
                        <NavLink className="ico_creative_btn" href="/token" onClick={ClickHandler}>
                            <span className="btn_wrapper">
                                <span className="btn_icon_left">
                                    <small className="dot_top"></small>
                                    <small className="dot_bottom"></small>
                                    <svg className="icon_arrow_left" viewBox="0 0 28 23" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.4106 20.8083L5.36673 12.6878C5.26033 12.5804 5.11542 12.52 4.96423 12.52H1.84503C1.34158 12.52 1.08822 13.1276 1.44252 13.4852L9.48642 21.6057C9.59281 21.7131 9.73773 21.7736 9.88892 21.7736H13.0081C13.5116 21.7736 13.7649 21.166 13.4106 20.8083Z" />
                                        <path d="M12.6803 9.57324H24.71C25.7116 9.57324 26.5234 10.3851 26.5234 11.3866C26.5234 12.3882 25.7116 13.2 24.71 13.2H12.6803C11.6788 13.2 10.8669 12.3882 10.8669 11.3866C10.8669 10.3851 11.6788 9.57324 12.6803 9.57324Z" />
                                        <path d="M1.44252 9.28834L9.48641 1.16784C9.59281 1.06043 9.73772 1 9.88891 1H13.0081C13.5116 1 13.7649 1.60758 13.4106 1.96525L5.36672 10.0858C5.26033 10.1932 5.11541 10.2536 4.96422 10.2536H1.84502C1.34158 10.2536 1.08822 9.64601 1.44252 9.28834Z" />
                                    </svg>
                                </span>
                                <span className="btn_label">Purchase a Token</span>
                                <span className="btn_icon_right">
                                    <small className="dot_top"></small>
                                    <small className="dot_bottom"></small>
                                    <svg className="icon_arrow_right" viewBox="0 0 27 23" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.6558 2.19168L21.6997 10.3122C21.8061 10.4196 21.951 10.48 22.1022 10.48H25.2214C25.7248 10.48 25.9782 9.87238 25.6239 9.51478L17.58 1.39428C17.4736 1.28688 17.3287 1.22638 17.1775 1.22638H14.0583C13.5548 1.22638 13.3015 1.83398 13.6558 2.19168Z" />
                                        <path d="M14.3861 13.4268H2.35637C1.35486 13.4268 0.542969 12.6149 0.542969 11.6134C0.542969 10.6118 1.35486 9.79996 2.35637 9.79996H14.3861C15.3876 9.79996 16.1995 10.6118 16.1995 11.6134C16.1995 12.6149 15.3876 13.4268 14.3861 13.4268Z" />
                                        <path d="M25.6239 13.7117L17.58 21.8322C17.4736 21.9396 17.3287 22 17.1775 22H14.0583C13.5548 22 13.3015 21.3924 13.6558 21.0347L21.6997 12.9142C21.8061 12.8068 21.951 12.7464 22.1022 12.7464H25.2214C25.7248 12.7464 25.9782 13.354 25.6239 13.7117Z" />
                                    </svg>
                                </span>
                            </span>
                        </NavLink>
                    </div>
                </div>
                <div className="footer_bottom text-center">
                    <p className="copyright_text m-0 text-secondary">Copyright© 2025 Coinlye. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
