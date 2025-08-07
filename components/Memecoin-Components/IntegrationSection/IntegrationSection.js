import React from 'react'
import Link from 'next/link'
import sIcon1 from '/assets/frontend/public/images/icon/int-icon.svg'
import sIcon2 from '/assets/frontend/public/images/icon/arrow-black.png'
import Icon1 from '/assets/frontend/public/images/icon/int-icon01.png'
import Icon2 from '/assets/frontend/public/images/icon/int-icon02.png'
import Icon3 from '/assets/frontend/public/images/icon/int-icon03.png'
import Icon4 from '/assets/frontend/public/images/icon/int-icon04.png'
import Icon8 from '/assets/frontend/public/images/icon/int-icon08.png'
import Icon9 from '/assets/frontend/public/images/icon/int-icon09.png'
import Icon10 from '/assets/frontend/public/images/icon/int-icon10.png'
import Icon11 from '/assets/frontend/public/images/icon/int-icon11.png'
import Icon12 from '/assets/frontend/public/images/icon/int-icon12.png'
import Icon13 from '/assets/frontend/public/images/icon/int-icon13.png'
import Icon14 from '/assets/frontend/public/images/icon/int-icon14.png'



const IntegrationSection = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (

        <section id="integration" className="integration pt-120 pb-120" style={{ backgroundColor: '#f6f0e6' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="integration-left ul_li_between flex-nowrap">
                            <div className="intgration-item--one pos-rel">
                                <div className="integration-inner marquee-first">
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon1} alt="" /></div>
                                        <span className="xb-title">Google Analytics</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon2} alt="" /></div>
                                        <span className="xb-title">Omnisend</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon3} alt="" /></div>
                                        <span className="xb-title">Mailchimp</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon4} alt="" /></div>
                                        <span className="xb-title">Hubspot</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon1} alt="" /></div>
                                        <span className="xb-title">Google Analytics</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon2} alt="" /></div>
                                        <span className="xb-title">Omnisend</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon3} alt="" /></div>
                                        <span className="xb-title">Mailchimp</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon4} alt="" /></div>
                                        <span className="xb-title">Hubspot</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon1} alt="" /></div>
                                        <span className="xb-title">Google Analytics</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon2} alt="" /></div>
                                        <span className="xb-title">Omnisend</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon4} alt="" /></div>
                                        <span className="xb-title">Hubspot</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon1} alt="" /></div>
                                        <span className="xb-title">Google Analytics</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon2} alt="" /></div>
                                        <span className="xb-title">Omnisend</span>
                                    </div>
                                </div>
                            </div>
                            <div className="intgration-item--two pos-rel">
                                <div className="integration-inner marquee-2">
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon1} alt="" /></div>
                                        <span className="xb-title">Instagram</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon2} alt="" /></div>
                                        <span className="xb-title">Zendesk</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon3} alt="" /></div>
                                        <span className="xb-title">Messenger</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon1} alt="" /></div>
                                        <span className="xb-title">Instagram</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon2} alt="" /></div>
                                        <span className="xb-title">Zendesk</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon3} alt="" /></div>
                                        <span className="xb-title">Messenger</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon1} alt="" /></div>
                                        <span className="xb-title">Instagram</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon2} alt="" /></div>
                                        <span className="xb-title">Zendesk</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon3} alt="" /></div>
                                        <span className="xb-title">Messenger</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="integration-middle">
                            <div className="xb-inner">
                                <div className="sec-title--two sec-title--four">
                                    <div className="sub-title"><img src={sIcon1} alt="" />Integration</div>
                                    <h2 className="title">Popular apps integrate with us</h2>
                                </div>
                                <div className="xb-btn mt-40">
                                    <Link onClick={ClickHandler} href="/pricing" className="thm-btn thm-btn--three thm-btn--black">Start your free trial
                                        <span>
                                            <img className="img--one" src={sIcon2} alt="" />
                                            <img className="img--two" src={sIcon2} alt="" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="integration-right ul_li_between flex-nowrap">
                            <div className="intgration-item--two pos-rel">
                                <div className="integration-inner marquee-first">
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon8} alt="" /></div>
                                        <span className="xb-title">Slack</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon9} alt="" /></div>
                                        <span className="xb-title">Tidio OpenAPI</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon10} alt="" /></div>
                                        <span className="xb-title">Loom</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon8} alt="" /></div>
                                        <span className="xb-title">Slack</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon9} alt="" /></div>
                                        <span className="xb-title">Tidio OpenAPI</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon10} alt="" /></div>
                                        <span className="xb-title">Loom</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon8} alt="" /></div>
                                        <span className="xb-title">Slack</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon9} alt="" /></div>
                                        <span className="xb-title">Tidio OpenAPI</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon10} alt="" /></div>
                                        <span className="xb-title">Loom</span>
                                    </div>
                                </div>
                            </div>
                            <div className="intgration-item--one pos-rel">
                                <div className="integration-inner marquee-2">
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon11} alt="" /></div>
                                        <span className="xb-title">Active Campaign</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon12} alt="" /></div>
                                        <span className="xb-title">Shopify</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon13} alt="" /></div>
                                        <span className="xb-title">WhatsApp</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon14} alt="" /></div>
                                        <span className="xb-title">Airtable</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon11} alt="" /></div>
                                        <span className="xb-title">Active Campaign</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon12} alt="" /></div>
                                        <span className="xb-title">Shopify</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon13} alt="" /></div>
                                        <span className="xb-title">WhatsApp</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon14} alt="" /></div>
                                        <span className="xb-title">Airtable</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon11} alt="" /></div>
                                        <span className="xb-title">Active Campaign</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon12} alt="" /></div>
                                        <span className="xb-title">Shopify</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon13} alt="" /></div>
                                        <span className="xb-title">WhatsApp</span>
                                    </div>
                                    <div className="integration-item">
                                        <div className="xb-icon"><img src={Icon14} alt="" /></div>
                                        <span className="xb-title">Airtable</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default IntegrationSection;