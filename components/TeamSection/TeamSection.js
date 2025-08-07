import { useState } from 'react';
import team1 from '/assets/frontend/public/images/avatars/avatar_1.webp';
import team2 from '/assets/frontend/public/images/avatars/avatar_2.webp';
import team3 from '/assets/frontend/public/images/avatars/avatar_3.webp';
import team4 from '/assets/frontend/public/images/avatars/avatar_4.webp';
import team5 from '/assets/frontend/public/images/avatars/avatar_5.webp';
import team6 from '/assets/frontend/public/images/avatars/avatar_6.webp';
import team7 from '/assets/frontend/public/images/avatars/avatar_7.webp';
import team8 from '/assets/frontend/public/images/avatars/avatar_8.webp';
import shape from '/assets/frontend/public/images/shapes/shape_section_divider_1.svg';
import Link from 'next/link';
import Image from 'next/image';

// Team data for each tab
const teamData = {
    advisoryTeam: [
        {
            name: 'Levi Harrison',
            designation: 'Compliance Officer',
            description: 'Compliance Officer ensuring regulatory adherence and risk management.',
            avatar: team1,
            linkedin: '/',
        },
        {
            name: 'Luna Seraphine',
            designation: 'Financial Officer',
            description: 'Financial Officer focused on profitability and resource management.',
            avatar: team2,
            linkedin: '/',
        },
        {
            name: 'Elias Maverick',
            designation: 'Founder & CEO',
            description: 'A hands-on founder who loves building scaling businesses with clients.',
            avatar: team3,
            linkedin: '/',
        },
        {
            name: 'Atticus Graham',
            designation: 'Technical Support',
            description: 'Passionate in seeking solutions for your problems.',
            avatar: team4,
            linkedin: '/',
        },
        {
            name: 'Amara Noelle',
            designation: 'CTO Manager',
            description: 'CTO Manager driving tech innovation and overseeing development strategies.',
            avatar: team5,
            linkedin: '/',
        },
        {
            name: 'Ethan Mitchell',
            designation: 'Blockchain Developer',
            description: 'Blockchain Developer building secure and scalable decentralized solutions.',
            avatar: team6,
            linkedin: '/',
        },
        {
            name: 'Aurora Selene',
            designation: 'Legal Advisor',
            description: 'Legal Advisor providing expert guidance on legal matters and risk management.',
            avatar: team7,
            linkedin: '/',
        },
        {
            name: 'Orion Maxwell',
            designation: 'Project Manager',
            description: 'Committed to delivering successful projects consistently.',
            avatar: team8,
            linkedin: '/',
        },
    ],
    managementTeam: [
        {
            name: 'Ethan Mitchell',
            designation: 'Blockchain Developer',
            description: 'Blockchain Developer building secure and scalable decentralized solutions.',
            avatar: team6,
            linkedin: '/',
        },
        {
            name: 'Aurora Selene',
            designation: 'Legal Advisor',
            description: 'Legal Advisor providing expert guidance on legal matters and risk management.',
            avatar: team7,
            linkedin: '/',
        },
        {
            name: 'Orion Maxwell',
            designation: 'Project Manager',
            description: 'Committed to delivering successful projects consistently.',
            avatar: team8,
            linkedin: '/',
        },
        {
            name: 'Levi Harrison',
            designation: 'Compliance Officer',
            description: 'Compliance Officer ensuring regulatory adherence and risk management.',
            avatar: team1,
            linkedin: '/',
        },
        {
            name: 'Luna Seraphine',
            designation: 'Financial Officer',
            description: 'Financial Officer focused on profitability and resource management.',
            avatar: team2,
            linkedin: '/',
        },
        {
            name: 'Elias Maverick',
            designation: 'Founder & CEO',
            description: 'A hands-on founder who loves building scaling businesses with clients.',
            avatar: team3,
            linkedin: '/',
        },
        {
            name: 'Atticus Graham',
            designation: 'Technical Support',
            description: 'Passionate in seeking solutions for your problems.',
            avatar: team4,
            linkedin: '/',
        },
        {
            name: 'Amara Noelle',
            designation: 'CTO Manager',
            description: 'CTO Manager driving tech innovation and overseeing development strategies.',
            avatar: team5,
            linkedin: '/',
        },
    ],
    marketingTeam: [
        {
            name: 'Elias Maverick',
            designation: 'Founder & CEO',
            description: 'A hands-on founder who loves building scaling businesses with clients.',
            avatar: team3,
            linkedin: '/',
        },
        {
            name: 'Atticus Graham',
            designation: 'Technical Support',
            description: 'Passionate in seeking solutions for your problems.',
            avatar: team4,
            linkedin: '/',
        },
        {
            name: 'Amara Noelle',
            designation: 'CTO Manager',
            description: 'CTO Manager driving tech innovation and overseeing development strategies.',
            avatar: team5,
            linkedin: '/',
        },
        {
            name: 'Ethan Mitchell',
            designation: 'Blockchain Developer',
            description: 'Blockchain Developer building secure and scalable decentralized solutions.',
            avatar: team6,
            linkedin: '/',
        },
        {
            name: 'Aurora Selene',
            designation: 'Legal Advisor',
            description: 'Legal Advisor providing expert guidance on legal matters and risk management.',
            avatar: team7,
            linkedin: '/',
        },
        {
            name: 'Orion Maxwell',
            designation: 'Project Manager',
            description: 'Committed to delivering successful projects consistently.',
            avatar: team8,
            linkedin: '/',
        },
        {
            name: 'Levi Harrison',
            designation: 'Compliance Officer',
            description: 'Compliance Officer ensuring regulatory adherence and risk management.',
            avatar: team1,
            linkedin: '/',
        },
        {
            name: 'Luna Seraphine',
            designation: 'Financial Officer',
            description: 'Financial Officer focused on profitability and resource management.',
            avatar: team2,
            linkedin: '/',
        },
    ],
};

const TeamSection = () => {
    const [activeTab, setActiveTab] = useState('advisoryTeam'); // Default active tab

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const renderTeamMembers = (team) => {
        return team.map((member, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-sm-6">
                <div className="ico_team_block">
                    <div className="ico_team_block_inner">
                        <div className="front_side_content">
                            <div className="team_avatar" style={{ backgroundImage: `url('/images/shapes/shape_circle_${index + 1}.svg')` }}>
                                <div className="avatar_wrap">
                                    <Image src={member.avatar} alt={member.name} />
                                </div>
                            </div>
                            <h3 className="team_member_name">{member.name}</h3>
                            <span className="team_member_designation mb-0">{member.designation}</span>
                        </div>
                        <div className="back_side_content">
                            <p className="team_member_description">{member.description}</p>
                            <ul className="social_block unordered_list justify-content-center">
                                <li>
                                    <Link href={member.linkedin}>
                                        <i className="fa-brands fa-linkedin"></i>
                                    </Link>
                                </li>
                            </ul>
                            <h4 className="team_member_name">{member.name}</h4>
                            <span className="team_member_designation mb-0">{member.designation}</span>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <section id="id_ico_team_section" className="ico_team_section section_decoration section_shadow_top section_space">
            <div className="decoration_item shape_divider_1">
                <Image src={shape} alt="Shape Divider" />
            </div>
            <div className="container">
                <div className="ico_heading_block text-center" data-aos="fade-up" data-aos-duration="800">
                    <h2 className="heading_text mb-0">Active Team & Advisors</h2>
                </div>

                <div className="tab_block" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                    <div className="d-flex justify-content-center">
                        <ul className="nav unordered_list justify-content-md-center" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === 'advisoryTeam' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('advisoryTeam')}
                                    type="button"
                                    role="tab"
                                >
                                    Advisory Team
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === 'managementTeam' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('managementTeam')}
                                    type="button"
                                    role="tab"
                                >
                                    Management Team
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === 'marketingTeam' ? 'active' : ''}`}
                                    onClick={() => handleTabChange('marketingTeam')}
                                    type="button"
                                    role="tab"
                                >
                                    Marketing Team
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="tab-content">
                        <div className={`tab-pane fade ${activeTab === 'advisoryTeam' ? 'show active' : ''}`} role="tabpanel">
                            <div className="row justify-content-center">{renderTeamMembers(teamData.advisoryTeam)}</div>
                        </div>
                        <div className={`tab-pane fade ${activeTab === 'managementTeam' ? 'show active' : ''}`} role="tabpanel">
                            <div className="row justify-content-center">{renderTeamMembers(teamData.managementTeam)}</div>
                        </div>
                        <div className={`tab-pane fade ${activeTab === 'marketingTeam' ? 'show active' : ''}`} role="tabpanel">
                            <div className="row justify-content-center">{renderTeamMembers(teamData.marketingTeam)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;