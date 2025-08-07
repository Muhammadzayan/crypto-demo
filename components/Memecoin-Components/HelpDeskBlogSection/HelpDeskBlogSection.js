import React from 'react'
import blogs from '../'../../pages/api/admin/blogs''
import Link from 'next/link'
import { Fade } from "react-awesome-reveal";
import icon from '/assets/frontend/public/images/icon/cap-black.svg'
import icon2 from '/assets/frontend/public/images/icon/edit-2.png'
import icon3 from '/assets/frontend/public/images/icon/colorfilter.png'
import icon4 from '/assets/frontend/public/images/icon/arrow-black.png'


const HelpDeskBlogSection = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className="blog pt-130">
            <div className="container">
                <div className="hd-blog-top mb-30 ul_li_between">
                    <div className="sec-title--two sec-title--four mb-30">
                        <Fade direction='down' triggerOnce={'false'} duration={1000} delay={9}>
                            <div>
                                <div className="sub-title wow fadeInDown" data-wow-duration="600ms"><img src={icon} alt="" />News</div>
                            </div>
                        </Fade>
                        <Fade direction='down' triggerOnce={'false'} duration={1500} delay={9}>
                            <div>
                                <h2 className="title wow skewIn" data-wow-delay="150ms" data-wow-duration="600ms">Our latest news</h2>
                            </div>
                        </Fade>
                    </div>
                    <Fade direction='right' triggerOnce={'false'} duration={1500} delay={9}>
                        <div>
                            <div className="xb-btn wow fadeInRight mb-30" data-wow-delay="150ms" data-wow-duration="600ms">
                                <Link onClick={ClickHandler} href="/blog" className="thm-btn thm-btn--three thm-btn--black">More news
                                    <span>
                                        <img className="img--one" src={icon4} alt="" />
                                        <img className="img--two" src={icon4} alt="" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </Fade>
                </div>
                <div className="row mt-none-30">
                    <div className="col-lg-6 mt-30">
                        {blogs.slice(12, 13).map((blog, Bitem) => (
                            <div className="hd-blog hd-blog-left" key={Bitem}>
                                <Link onClick={ClickHandler} href={'/blog-single/[slug]'} as={`/blog-single/${blog.slug}`} className="xb-item--img"><img src={blog.screens} alt="" /></Link>
                                <div className="xb-item--holder">
                                    <ul className="xb-item--meta list-unstyled">
                                        <li><span><img src={icon2} alt="" /></span>Report</li>
                                        <li>{blog.read}</li>
                                    </ul>
                                    <h2 className="xb-item--title border-effect"><Link onClick={ClickHandler} href={'/blog-single/[slug]'} as={`/blog-single/${blog.slug}`}>{blog.title}</Link></h2>
                                    <span className="xb-item--content">Innomax’s AI-Support boosts efficiency and enhances customer service.</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-6">
                        {blogs.slice(13, 16).map((blog, Bitem) => (
                            <div className="hd-blog hd-blog-right ul_li" key={Bitem}>
                                <div className="xb-item--holder">
                                    <ul className="xb-item--meta list-unstyled">
                                        <li><span><img src={icon3} alt="" /></span>Report</li>
                                        <li>{blog.read}</li>
                                    </ul>
                                    <h2 className="xb-item--title border-effect"><Link onClick={ClickHandler} href={'/blog-single/[slug]'} as={`/blog-single/${blog.slug}`}>{blog.title}</Link></h2>
                                </div>
                                <Link onClick={ClickHandler} href={'/blog-single/[slug]'} as={`/blog-single/${blog.slug}`} className="xb-item--img"><img src={blog.screens} alt="" /></Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HelpDeskBlogSection;