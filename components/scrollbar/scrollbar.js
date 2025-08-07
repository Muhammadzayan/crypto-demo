import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Scrollbar = () => {

    return (
        <ul className="smothscroll">
            <li><AnchorLink href='#__next'><i className="far fa-arrow-up"></i></AnchorLink></li>
        </ul>

    )
}

export default Scrollbar;
