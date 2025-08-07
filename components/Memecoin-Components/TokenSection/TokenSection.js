import React, { useState } from "react";

import Bg2 from '/assets/frontend/public/images/shapes/shape_net_2.svg'

const TokenSection = (props) => {
    const [buttonText, setButtonText] = useState("Copy");

    // Handle Copy Button Click
    const handleCopyClick = () => {
        const codeText = document.querySelector(".code mark").textContent;
        const textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
        textarea.value = codeText;
        textarea.select();

        try {
            document.execCommand("copy");
            setButtonText("Copied!");

            // Reset text after 2 seconds
            setTimeout(() => {
                setButtonText("Copy");
            }, 2000);
        } catch (err) {
            console.error("Copy failed", err);
        }

        document.body.removeChild(textarea);
    };


    return (
        <section
            id="id_memecoin_service_section"
            className={`memecoin_service_section section_space z-2 position-relative ${props.tokenClass}`}
        >
            <div className="container">
                <div
                    className="memecoin_partners_logo text-center"
                    style={{ backgroundImage: `url(${Bg2})` }}
                    data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
                    <div className="memecoin_heading_block">
                        <h3 className="heading_text text-uppercase mb-0 text-light">Get Coin Now ON</h3>
                    </div>

                    <div className="token_copy_board">
                        <span className="icon">
                            <i className="fa-solid fa-link"></i>
                        </span>
                        <span className="code">
                            Token Contract Address: <mark>Oxe3c127466908c2ccdc43521c8315b87fd369d605</mark>
                        </span>
                        <button className="copy_btn" type="button" onClick={handleCopyClick}>
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TokenSection;
