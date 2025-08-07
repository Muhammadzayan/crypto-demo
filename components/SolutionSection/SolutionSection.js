import React from 'react';
import check from '/assets/frontend/icons/icon_check.svg';
import sIcon1 from '/assets/frontend/icons/icon_man_question.svg';
import sIcon2 from '/assets/frontend/icons/icon_bulb.svg';
import Image from 'next/image';


const SolutionSection = () => {
    return (
        <section className="problem_solution_section section_space pb-0">
            <div className="container">

                <div className="ico_heading_block text-center" data-aos="fade-up" data-aos-duration="600">
                    <h2 className="heading_text mb-0">Coinlye ICO Problem & Solution</h2>
                </div>

                <div
                    className="ico_problem_solution_table"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="100"
                >
                    <div className="column_wrapper">
                        {/* ICO Problem Section */}
                        <div className="column_problem">
                            <h3 className="heading_text">
                                <span className="icon">
                                    <Image src={sIcon1} alt="Icon Man With Question" />
                                </span>
                                <span className="text">ICO Problem</span>
                            </h3>
                            <ul className="iconlist_block unordered_list_block">
                                {[
                                    {
                                        label: 'Identify the Issue.',
                                        info: 'We ensure transparency with clear updates.',
                                    },
                                    {
                                        label: 'Impact of the Problem.',
                                        info: 'The problem in an ICO attracts investor confidence.',
                                    },
                                    {
                                        label: 'Reduced Investment.',
                                        info: 'Less trust means fewer investments.',
                                    },
                                    {
                                        label: 'Scaling and Obsolete Tool.',
                                        info: 'Limited scalability hinders growth and expansion.',
                                    },
                                ].map((item, index) => (
                                    <li key={index}>
                                        <span className="iconlist_icon">
                                            <Image src={check} alt="Icon Check" />
                                        </span>
                                        <span className="iconlist_label">
                                            {item.label}
                                            <small className="iconlist_info">{item.info}</small>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* ICO Solution Section */}
                        <div className="column_solution">
                            <h3 className="heading_text">
                                <span className="icon">
                                    <Image src={sIcon2} alt="Icon Bulb" />
                                </span>
                                <span className="text">ICO Solution</span>
                            </h3>
                            <ul className="iconlist_block unordered_list_block">
                                {[
                                    {
                                        label: 'Introduce the Project and Token.',
                                        info: 'Our ICO Vision is building a Decentralized Ad Network.',
                                    },
                                    {
                                        label: 'Key Features or Innovations.',
                                        info: 'Advanced tech, top security, and smooth scalability.',
                                    },
                                    {
                                        label: 'Benefits to Users and Investors.',
                                        info: 'Transparency, security, and growth potential.',
                                    },
                                    {
                                        label: 'Global Single-Platform.',
                                        info: 'Seamless access and transactions worldwide.',
                                    },
                                ].map((item, index) => (
                                    <li key={index}>
                                        <span className="iconlist_icon">
                                            <Image src={check} alt="Icon Check" />
                                        </span>
                                        <span className="iconlist_label">
                                            {item.label}
                                            <small className="iconlist_info">{item.info}</small>
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolutionSection;
