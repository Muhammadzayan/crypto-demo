
import React, { Fragment, useState } from 'react';
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import { useRouter } from 'next/router'
import Link from "next/link";
import Header from '../../components/header/Header';
import sicon1 from '/assets/frontend/icons/icon_google.svg'
import shape1 from '/assets/frontend/public/images/shapes/shape_divider.svg'
import shape2 from '/assets/frontend/public/images/shapes/shape_flower_1.svg'
import Image from 'next/image';

const SigninPage = (props) => {

    const router = useRouter()

    const [value, setValue] = useState({
        email: 'user@gmail.com',
        password: '123456',
        remember: false,
    });

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        validator.showMessages();
    };

    const [validator] = React.useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const submitForm = async (e) => {
        e.preventDefault();

        if (validator.allValid()) {
            try {
                const response = await fetch('/api/authentication/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: value.email,
                        password: value.password
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    toast.success(result.message || 'Login successful!');
                    router.push('/dashboard'); // Redirect to dashboard after login
                } else {
                    toast.error(result.message || 'Login failed!');
                }
            } catch (error) {
                toast.error('Something went wrong. Please try again.');
            }
        } else {
            validator.showMessages();
            toast.error('Empty field is not allowed!');
        }
    };

    return (
        <Fragment>
            <div className='index_ico page_wrapper'>
                <Header />
                <main className="page_content">
                    <section className="register_section section_decoration">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5 position-relative">
                                    <form className="register_form" onSubmit={submitForm}>
                                        <h1 className="heading_text text-center">Login to Your Account</h1>
                                        <p className="text-center">Enter your details to login.</p>
                                        {/* <Link className="btn_login_google" href="/sign_in">
                                            <span className="icon">
                                                <Image src={sicon1} alt="Google Icon" />
                                            </span>
                                            <span className="label">Continue with Google</span>
                                        </Link>
                                        <div className="divider">
                                            <Image src={shape1} alt="Divider" />
                                        </div> */}
                                        <div className="form-group">
                                            <label className="input_title" htmlFor="input_email">Email<sup>*</sup></label>
                                            <input
                                                className="form-control"
                                                placeholder="alma.lawson@example.com"
                                                value={value.email}
                                                variant="outlined"
                                                name="email"
                                                label="E-mail"
                                                onBlur={(e) => changeHandler(e)}
                                                onChange={(e) => changeHandler(e)}
                                            />
                                            {validator.message('email', value.email, 'required|email')}
                                        </div>
                                        <div className="form-group">
                                            <label className="input_title" htmlFor="input_pass">Password<sup>*</sup></label>
                                            <input
                                                className="form-control"
                                                placeholder="***********"
                                                value={value.password}
                                                variant="outlined"
                                                name="password"
                                                type="password"
                                                label="Password"
                                                onBlur={(e) => changeHandler(e)}
                                                onChange={(e) => changeHandler(e)}
                                            />
                                            {validator.message('password', value.password, 'required')}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" id="checkbox_remember_me" />
                                                    <label className="form-check-label" htmlFor="checkbox_remember_me">
                                                        Remember Me
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <p className="forget_pass text-md-end mb-0">Forgot password? <Link href="/sign_in"><u>Reset</u></Link></p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <p className="forget_pass text-md-start">
                                                    Don’t have an account? <Link href="/sign_up"><u>Sign up</u></Link>
                                                </p>
                                            </div>
                                        </div>

                                        <button className="btn" type="submit">
                                            <span className="btn_label">Login</span>
                                            <span className="btn_icon"><i className="ti-arrow-top-right"></i></span>
                                        </button>
                                    </form>
                                    <div className="decoration_item shape_flower">
                                        <Image src={shape2} alt="Flower" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </Fragment>
    )
};
export default SigninPage;