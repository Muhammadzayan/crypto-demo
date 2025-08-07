import React, { useState } from "react";

const FAQSection = () => {
    const [activeTab, setActiveTab] = useState("tab_general_question");
    const [activeAccordion, setActiveAccordion] = useState("collapse_1");

    const toggleTab = (tabId) => {
        setActiveTab(tabId);
    };

    const toggleAccordion = (accordionId) => {
        setActiveAccordion(accordionId === activeAccordion ? "" : accordionId);
    };

    // Array of FAQ questions
    const faqQuestions = [
        "What is CoinLye ICO?",
        "How can I participate in the CoinLye ICO?",
        "What are the benefits of investing in CoinLye ICO?",
        "What is the total supply of CoinLye tokens?",
        "Can I sell my tokens after the ICO?",
    ];

    // Array of ICO questions
    const icoQuestions = [
        "What is the CoinLye ICO?",
        "How do I register for the CoinLye ICO?",
        "What is the CoinLye token?",
        "How can I purchase CoinLye tokens?",
        "What are the tokenomics of CoinLye tokens?",
    ];

    // Array of Token Sales questions
    const tokenSalesQuestions = [
        "What is the price of CoinLye tokens?",
        "When will the token sale begin?",
        "Can I buy tokens during the sale using cryptocurrency?",
        "What is the hard cap for the token sale?",
        "How are the funds raised in the token sale used?",
    ];

    // Array of Clients Related questions
    const clientsRelatedQuestions = [
        "How can I contact CoinLye for support?",
        "What services does CoinLye provide for clients?",
        "How secure is the CoinLye platform for clients?",
        "What is the refund policy for CoinLye clients?",
        "Are there any client bonuses for token holders?",
    ];

    return (
        <section className="faq_section section_space">
            <div className="container">
                <div className="ico_heading_block text-center" data-aos="fade-up" data-aos-duration="800">
                    <h2 className="heading_text mb-0">FAQ</h2>
                </div>

                <div className="tab_block" data-aos="fade-up" data-aos-duration="800" data-aos-delay="100">
                    <div className="d-flex justify-content-center">
                        <ul className="nav unordered_list justify-content-md-center" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === "tab_general_question" ? "active" : ""}`}
                                    type="button"
                                    role="tab"
                                    onClick={() => toggleTab("tab_general_question")}
                                >
                                    General Question
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === "tab_ico_questions" ? "active" : ""}`}
                                    type="button"
                                    role="tab"
                                    onClick={() => toggleTab("tab_ico_questions")}
                                >
                                    ICO Questions
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === "tab_tokens_sales" ? "active" : ""}`}
                                    type="button"
                                    role="tab"
                                    onClick={() => toggleTab("tab_tokens_sales")}
                                >
                                    Tokens Sales
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${activeTab === "tab_clients_releted" ? "active" : ""}`}
                                    type="button"
                                    role="tab"
                                    onClick={() => toggleTab("tab_clients_releted")}
                                >
                                    Clients Related
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="tab-content">
                        {/* General Question Tab */}
                        <div className={`tab-pane fade ${activeTab === "tab_general_question" ? "show active" : ""}`} role="tabpanel" id="tab_general_question">
                            <div className="ico_accordion" id="accordion_1">
                                {faqQuestions.map((question, index) => {
                                    const collapseId = `collapse_${index + 1}`;
                                    return (
                                        <div className="accordion-item" key={collapseId}>
                                            <div
                                                className={`icon_arrow ${activeAccordion === collapseId ? "collapsed" : ""}`}
                                                role="button"
                                                onClick={() => toggleAccordion(collapseId)}
                                            >
                                                <svg viewBox="0 0 23 27" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 14.597L10 2.56731C10 1.56579 10.8115 0.753906 11.8125 0.753906C12.8134 0.753906 13.6249 1.56579 13.6249 2.56731L13.6249 14.597C13.6249 15.5985 12.8134 16.4104 11.8125 16.4104C10.8115 16.4104 10 15.5985 10 14.597Z" />
                                                    <path d="M9.71371 25.8348L1.59744 17.7909C1.49009 17.6845 1.42969 17.5396 1.42969 17.3884L1.42969 14.2693C1.42969 13.7658 2.03695 13.5125 2.39443 13.8668L10.5108 21.9106C10.6181 22.017 10.6785 22.1619 10.6785 22.3131L10.6785 25.4323C10.6785 25.9358 10.0712 26.1891 9.71371 25.8348Z" />
                                                    <path d="M21.2273 13.8668L13.1111 21.9106C13.0037 22.017 12.9434 22.1619 12.9434 22.3131L12.9434 25.4323C12.9434 25.9358 13.5506 26.1891 13.9081 25.8348L22.0243 17.7909C22.1317 17.6845 22.1921 17.5396 22.1921 17.3884L22.1921 14.2693C22.1921 13.7658 21.5849 13.5125 21.2273 13.8668Z" />
                                                </svg>
                                            </div>
                                            <div
                                                className={`accordion-button ${activeAccordion === collapseId ? "" : "collapsed"}`}
                                                role="button"
                                                onClick={() => toggleAccordion(collapseId)}
                                            >
                                                {`${index + 1}- ${question}`}
                                            </div>
                                            <div id={collapseId} className={`accordion-collapse collapse ${activeAccordion === collapseId ? "show" : ""}`} data-bs-parent="#accordion_1">
                                                <div className="accordion-body">
                                                    <p>
                                                        You can participate in the CoinLye ICO, simply register on our platform, complete the KYC (Know Your Customer) process, and follow the instructions to purchase tokens during the ICO period, Once registered buy tokens with secure payments.
                                                    </p>
                                                    <ul className="iconlist_block unordered_list_block">
                                                        <li>
                                                            <span className="iconlist_icon">
                                                                <i className="fa-solid fa-circle"></i>
                                                            </span>
                                                            <span className="iconlist_label">
                                                                Sign up and complete the KYC process.
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <span className="iconlist_icon">
                                                                <i className="fa-solid fa-circle"></i>
                                                            </span>
                                                            <span className="iconlist_label">
                                                                Follow instructions to purchase tokens securely.
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ICO Questions Tab */}
                        <div className={`tab-pane fade ${activeTab === "tab_ico_questions" ? "show active" : ""}`} role="tabpanel" id="tab_ico_questions">
                            <div className="ico_accordion" id="accordion_2">
                                {icoQuestions.map((question, index) => {
                                    const collapseId = `collapse_ico_${index + 1}`;
                                    return (
                                        <div className="accordion-item" key={collapseId}>
                                            <div
                                                className={`icon_arrow ${activeAccordion === collapseId ? "collapsed" : ""}`}
                                                role="button"
                                                onClick={() => toggleAccordion(collapseId)}
                                            >
                                                <svg viewBox="0 0 23 27" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 14.597L10 2.56731C10 1.56579 10.8115 0.753906 11.8125 0.753906C12.8134 0.753906 13.6249 1.56579 13.6249 2.56731L13.6249 14.597C13.6249 15.5985 12.8134 16.4104 11.8125 16.4104C10.8115 16.4104 10 15.5985 10 14.597Z" />
                                                    <path d="M9.71371 25.8348L1.59744 17.7909C1.49009 17.6845 1.42969 17.5396 1.42969 17.3884L1.42969 14.2693C1.42969 13.7658 2.03695 13.5125 2.39443 13.8668L10.5108 21.9106C10.6181 22.017 10.6785 22.1619 10.6785 22.3131L10.6785 25.4323C10.6785 25.9358 10.0712 26.1891 9.71371 25.8348Z" />
                                                    <path d="M21.2273 13.8668L13.1111 21.9106C13.0037 22.017 12.9434 22.1619 12.9434 22.3131L12.9434 25.4323C12.9434 25.9358 13.5506 26.1891 13.9081 25.8348L22.0243 17.7909C22.1317 17.6845 22.1921 17.5396 22.1921 17.3884L22.1921 14.2693C22.1921 13.7658 21.5849 13.5125 21.2273 13.8668Z" />
                                                </svg>
                                            </div>
                                            <div
                                                className={`accordion-button ${activeAccordion === collapseId ? "" : "collapsed"}`}
                                                role="button"
                                                onClick={() => toggleAccordion(collapseId)}
                                            >
                                                {`${index + 1}- ${question}`}
                                            </div>
                                            <div id={collapseId} className={`accordion-collapse collapse ${activeAccordion === collapseId ? "show" : ""}`} data-bs-parent="#accordion_2">
                                                <div className="accordion-body">
                                                    <p>
                                                        CoinLye ICO is a unique opportunity to purchase tokens at a discounted price before the public sale. You need to complete KYC to ensure your security and follow the instructions to purchase tokens securely.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Tokens Sales Tab */}
                        <div className={`tab-pane fade ${activeTab === "tab_tokens_sales" ? "show active" : ""}`} role="tabpanel" id="tab_tokens_sales">
                            <div className="ico_accordion" id="accordion_3">
                                {tokenSalesQuestions.map((question, index) => {
                                    const collapseId = `collapse_token_sales_${index + 1}`;
                                    return (
                                        <div className="accordion-item" key={collapseId}>
                                            <div
                                                className={`icon_arrow ${activeAccordion === collapseId ? "collapsed" : ""}`}
                                                role="button"
                                                onClick={() => toggleAccordion(collapseId)}
                                            >
                                                <svg viewBox="0 0 23 27" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 14.597L10 2.56731C10 1.56579 10.8115 0.753906 11.8125 0.753906C12.8134 0.753906 13.6249 1.56579 13.6249 2.56731L13.6249 14.597C13.6249 15.5985 12.8134 16.4104 11.8125 16.4104C10.8115 16.4104 10 15.5985 10 14.597Z" />
                                                    <path d="M9.71371 25.8348L1.59744 17.7909C1.49009 17.6845 1.42969 17.5396 1.42969 17.3884L1.42969 14.2693C1.42969 13.7658 2.03695 13.5125 2.39443 13.8668L10.5108 21.9106C10.6181 22.017 10.6785 22.1619 10.6785 22.3131L10.6785 25.4323C10.6785 25.9358 10.0712 26.1891 9.71371 25.8348Z" />
                                                    <path d="M21.2273 13.8668L13.1111 21.9106C13.0037 22.017 12.9434 22.1619 12.9434 22.3131L12.9434 25.4323C12.9434 25.9358 13.5506 26.1891 13.9081 25.8348L22.0243 17.7909C22.1317 17.6845 22.1921 17.5396 22.1921 17.3884L22.1921 14.2693C22.1921 13.7658 21.5849 13.5125 21.2273 13.8668Z" />
                                                </svg>
                                            </div>
                                            <div
                                                className={`accordion-button ${activeAccordion === collapseId ? "" : "collapsed"}`}
                                                role="button"
                                                onClick={() => toggleAccordion(collapseId)}
                                            >
                                                {`${index + 1}- ${question}`}
                                            </div>
                                            <div id={collapseId} className={`accordion-collapse collapse ${activeAccordion === collapseId ? "show" : ""}`} data-bs-parent="#accordion_3">
                                                <div className="accordion-body">
                                                    <p>
                                                        Token sales will begin soon. The price of tokens will depend on the ICO stage. You can buy them using crypto payments, and funds will be used for project development and marketing.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Clients Related Tab */}
                        <div className={`tab-pane fade ${activeTab === "tab_clients_releted" ? "show active" : ""}`} role="tabpanel" id="tab_clients_releted">
                            <div className="ico_accordion" id="accordion_4">
                                {clientsRelatedQuestions.map((question, index) => {
                                    const collapseId = `collapse_clients_${index + 1}`;
                                    return (
                                        <div className="accordion-item" key={collapseId}>
                                            <div
                                                className={`icon_arrow ${activeAccordion === collapseId ? "collapsed" : ""}`}
                                                role="button"
                                                onClick={() => toggleAccordion(collapseId)}
                                            >
                                                <svg viewBox="0 0 23 27" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 14.597L10 2.56731C10 1.56579 10.8115 0.753906 11.8125 0.753906C12.8134 0.753906 13.6249 1.56579 13.6249 2.56731L13.6249 14.597C13.6249 15.5985 12.8134 16.4104 11.8125 16.4104C10.8115 16.4104 10 15.5985 10 14.597Z" />
                                                    <path d="M9.71371 25.8348L1.59744 17.7909C1.49009 17.6845 1.42969 17.5396 1.42969 17.3884L1.42969 14.2693C1.42969 13.7658 2.03695 13.5125 2.39443 13.8668L10.5108 21.9106C10.6181 22.017 10.6785 22.1619 10.6785 22.3131L10.6785 25.4323C10.6785 25.9358 10.0712 26.1891 9.71371 25.8348Z" />
                                                    <path d="M21.2273 13.8668L13.1111 21.9106C13.0037 22.017 12.9434 22.1619 12.9434 22.3131L12.9434 25.4323C12.9434 25.9358 13.5506 26.1891 13.9081 25.8348L22.0243 17.7909C22.1317 17.6845 22.1921 17.5396 22.1921 17.3884L22.1921 14.2693C22.1921 13.7658 21.5849 13.5125 21.2273 13.8668Z" />
                                                </svg>
                                            </div>
                                            <div
                                                className={`accordion-button ${activeAccordion === collapseId ? "" : "collapsed"}`}
                                                role="button"
                                                onClick={() => toggleAccordion(collapseId)}
                                            >
                                                {`${index + 1}- ${question}`}
                                            </div>
                                            <div id={collapseId} className={`accordion-collapse collapse ${activeAccordion === collapseId ? "show" : ""}`} data-bs-parent="#accordion_4">
                                                <div className="accordion-body">
                                                    <p>
                                                        CoinLye is committed to offering a seamless experience for clients. We provide customer support 24/7, ensuring a safe and secure platform with transparent refund policies.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
