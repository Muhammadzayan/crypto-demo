import React, { useState } from 'react'
import Link from 'next/link'
import { Fade } from "react-awesome-reveal";
import ModalVideo from 'react-modal-video'
import icon from '/assets/frontend/public/images/icon/video-circle.svg'
import vImg from '/assets/frontend/public/images/video/img01.png'
import icon1 from '/assets/frontend/public/images/video/polygon.png'
import icon2 from '/assets/frontend/public/images/icon/arrow-black.png'
import icon3 from '/assets/frontend/public/images/shape/line_shape01.png'
import icon4 from '/assets/frontend/public/images/shape/line-shape02.png'

const VideoService = (props) => {

    const [isOpen, setOpen] = useState(false)

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }
    return (
        <section id="funfact" className="video pt-130 pb-130" style={{ backgroundColor: '#fff' }}>
            <div className="container">
                <div className="video-wrap">
                    <div className="sec-title--two sec-title--four text-center mb-65">
                        <Fade direction='down' triggerOnce={'false'} duration={1000} delay={9}>
                            <div>
                                <div className="sub-title wow fadeInDown" data-wow-duration="600ms"><img src={icon} alt="" />How it’s work</div>
                            </div>
                        </Fade>
                        <Fade direction='down' triggerOnce={'false'} duration={1500} delay={9}>
                            <div>
                                <h2 className="title wow fadeInDown" data-wow-delay="150ms" data-wow-duration="600ms">Simplify work innomax</h2>
                            </div>
                        </Fade>
                    </div>
                    <div className="xb-video">
                        <img src={vImg} alt="" />
                        <button onClick={() => setOpen(true)} className="popup-video btn-video"><img src={icon1} alt="" /></button>
                    </div>
                    <div className="xb-btn text-center mt-20 wow fadeInUp" data-wow-duration="600ms">
                        <Link onClick={ClickHandler} href="/pricing" className="thm-btn thm-btn--three">Start your free trial
                            <span>
                                <img className="img--one" src={icon2} alt="" />
                                <img className="img--two" src={icon2} alt="" />
                            </span>
                        </Link>
                    </div>
                    <div className="xb-shape">
                        <img className="img img--one xbzoominzoomup" src={icon3} alt="" />
                        <img className="img img--two" data-parallax='{"y" : -100, "x" : 50, "smoothness": 10}' src={icon4} alt="" />
                    </div>
                </div>
            </div>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId="cRXm1p-CNyk" onClose={() => setOpen(false)} />
        </section>
    )
}

export default VideoService;