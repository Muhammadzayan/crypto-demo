import React, { Fragment, useState } from 'react';
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import NavLink from 'next/link'

const menus = [
    {
        id: 1,
        title: 'Home',
        link: '/home_ico',
        submenu: [
            {
                id: 11,
                title: 'Coinlye ICO',
                link: '/home_ico'
            },
            {
                id: 12,
                title: 'Memecoin',
                link: '/home_memecoin'
            },
            {
                id: 13,
                title: 'Pepecoin',
                link: '/home_pepecoin'
            }
        ]
    },
    {
        id: 7,
        title: 'My Account',
        link: '/sign_in',
        submenu: [
            {
                id: 71,
                title: 'Sign In',
                link: '/sign_in'
            },
            {
                id: 72,
                title: 'Sign Up',
                link: '/sign_up'
            },
        ]
    },
    {
        id: 6,
        title: 'Blog',
        link: '/blog',
        submenu: [
            {
                id: 61,
                title: 'Blog',
                link: '/blog'
            },
            {
                id: 62,
                title: 'Blog Details',
                link: '/blog-single/How-Our-Unique-Tokenomics-Ensures-Sustainable-Growth-and-Value'
            },
        ]
    },
    {
        id: 88,
        title: 'Contact',
        link: '/contact',
    },
    {
        id: 88,
        title: 'About Us',
        link: '/about',
    },
    {
        id: 88,
        title: 'Token',
        link: '/token',
    }


]

const MobileMenu4 = () => {

    const [openId, setOpenId] = useState(0);

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <ul className="mobail-menu main_menu_list unordered_list text-uppercase">
            {menus.map((item, mn) => {
                return (
                    <ListItem className={item.id === openId ? 'active' : null} key={mn}>
                        {item.submenu ?
                            <Fragment>
                                <p onClick={() => setOpenId(item.id === openId ? 0 : item.id)}>{item.title}
                                    <i className={item.id === openId ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
                                </p>
                                <Collapse in={item.id === openId} timeout="auto" unmountOnExit>
                                    <List className="menu-item menu-item-has-children active">
                                        <Fragment>
                                            {item.submenu.map((submenu, i) => {
                                                return (
                                                    <ListItem key={i}>
                                                        <NavLink onClick={ClickHandler} className="active"
                                                            href={submenu.link}>{submenu.title}</NavLink>
                                                    </ListItem>
                                                )
                                            })}
                                        </Fragment>
                                    </List>
                                </Collapse>
                            </Fragment>
                            : <NavLink className="active"
                                href={item.link}>{item.title}</NavLink>
                        }
                    </ListItem>
                )
            })}
        </ul>
    )
}

export default MobileMenu4;