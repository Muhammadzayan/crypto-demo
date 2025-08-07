
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

// Import same dependencies as before

const SigninPage = () => {
    const router = useRouter();

    const [submitted, setSubmitted] = useState(false);
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const [value, setValue] = useState({
        first_name: '',
        last_name: '',
        full_name: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [validator] = useState(new SimpleReactValidator({ className: 'errorMessage' }));

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        validator.showMessages();
    };

    const submitForm = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Mark form as submitted

    if (value.password !== value.confirm_password) {
        toast.error("Passwords do not match");
        return;
    }

    if (validator.allValid()) {
        try {
        const response = await fetch('/api/authentication/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(value),
        });

        const result = await response.json();

        if (response.ok) {
            toast.success(result.message || 'Registration successful!');
            router.push('/sign_in');
        } else {
            toast.error(result.message || 'Registration failed!');
        }
        } catch (error) {
        toast.error('Something went wrong. Please try again.');
        }
    } else {
        validator.showMessages();
        toast.error('Please fill all required fields!');
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
                                    <h1 className="heading_text text-center">Create a New Account</h1>
                                    <p className="text-center">Enter your details to register.</p>

                                    {/* First/Last Name Row */}
                                    <div className="row">
                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="first_name">First Name<sup>*</sup></label>
                                            <input type="text" className="form-control" name="first_name" value={value.first_name}
                                            onChange={changeHandler}
                                            onBlur={() => setTouched({ ...touched, first_name: true })}
                                            />
                                            {(touched.first_name || submitted) && validator.message('first_name', value.first_name, 'required')}
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="last_name">Last Name<sup>*</sup></label>
                                            <input type="text" className="form-control" name="last_name" value={value.last_name}
                                            onChange={changeHandler}
                                            onBlur={() => setTouched({ ...touched, last_name: true })}
                                            />
                                            {(touched.last_name || submitted) && validator.message('last_name', value.last_name, 'required')}
                                        </div>
                                        </div>
                                    </div>

                                    {/* Email/Password Row */}
                                    <div className="form-group mb-2 mt-3">
                                            <label htmlFor="email">Email<sup>*</sup></label>
                                            <input type="email" className="form-control" name="email" value={value.email}
                                            onChange={changeHandler}
                                            onBlur={() => setTouched({ ...touched, email: true })}
                                            />
                                            {(touched.email || submitted) && validator.message('email', value.email, 'required|email')}
                                        </div>

                                    <div className="row mb-2 mt-1">
                                       
                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="password">Password<sup>*</sup></label>
                                            <input type="password" className="form-control" name="password" value={value.password}
                                            onChange={changeHandler}
                                            onBlur={() => setTouched({ ...touched, password: true })}
                                            />
                                            {(touched.password || submitted) && validator.message('password', value.password, 'required')}
                                        </div>
                                        </div>
                                         <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="confirm_password">Confirm Password<sup>*</sup></label>
                                                <input type="password" className="form-control" name="confirm_password" value={value.confirm_password}
                                                onChange={changeHandler}
                                                onBlur={() => setTouched({ ...touched, confirm_password: true })}
                                                />
                                                {(touched.confirm_password || submitted) && validator.message('confirm_password', value.confirm_password, 'required')}
                                            </div>
                                        </div>
                                    </div>

                                   

                                    <div className="form-check mb-2 mt-3">
                                        <input className="form-check-input" type="checkbox" id="terms" />
                                        <label className="form-check-label" htmlFor="terms">
                                        By continuing you agree to our <Link href="/terms"><u>Terms and Conditions</u></Link>
                                        </label>
                                    </div>

                                    <button className="btn" type="submit">
                                        <span className="btn_label">Register</span>
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
    );
};

export default SigninPage;


// const SigninPage = (props) => {

//     const router = useRouter()

//     const [value, setValue] = useState({
//         email: '',
//         full_name: '',
//         password: '',
//         confirm_password: '',
//     });

//     const changeHandler = (e) => {
//         setValue({ ...value, [e.target.name]: e.target.value });
//         validator.showMessages();
//     };

//     const [validator] = React.useState(new SimpleReactValidator({
//         className: 'errorMessage'
//     }));


//     const submitForm = (e) => {
//         e.preventDefault();
//         if (validator.allValid()) {
//             setValue({
//                 email: '',
//                 full_name: '',
//                 password: '',
//                 confirm_password: '',
//             });
//             validator.hideMessages();
//             toast.success('Registration Complete successfully!');
//             router.push('/sign_in')
//         } else {
//             validator.showMessages();
//             toast.error('Empty field is not allowed!');
//         }
//     };

//     return (
//         <Fragment>
//             <div className='index_ico page_wrapper'>
//                 <Header />
//                 <main className="page_content">
//                     <section className="register_section section_decoration">
//                         <div className="container">
//                             <div className="row justify-content-center">
//                                 <div className="col-lg-5 position-relative">
//                                     <form className="register_form" onSubmit={submitForm}>
//                                         <h1 className="heading_text text-center">Create a New Account</h1>
//                                         <p className="text-center">Enter your details to register.</p>
//                                         {/* <Link className="btn_login_google" href="/sign_in">
//                                             <span className="icon">
//                                                 <Image src={sicon1} alt="Google Icon" />
//                                             </span>
//                                             <span className="label">Continue with Google</span>
//                                         </Link>
//                                         <div className="divider">
//                                             <Image src={shape1} alt="Divider" />
//                                         </div> */}
//                                         <div className="form-group">
//                                             <label className="input_title" htmlFor="input_email">Email<sup>*</sup></label>
//                                             <input
//                                                 className="form-control"
//                                                 placeholder="alma.lawson@example.com"
//                                                 value={value.email}
//                                                 variant="outlined"
//                                                 name="email"
//                                                 label="E-mail"
//                                                 onBlur={(e) => changeHandler(e)}
//                                                 onChange={(e) => changeHandler(e)}
//                                             />
//                                             {validator.message('email', value.email, 'required|email')}
//                                         </div>
//                                         <div className="form-group">
//                                             <label className="input_title" htmlFor="input_pass">Password<sup>*</sup></label>
//                                             <input
//                                                 className="form-control"
//                                                 placeholder="***********"
//                                                 value={value.password}
//                                                 variant="outlined"
//                                                 name="password"
//                                                 type="password"
//                                                 label="Password"
//                                                 onBlur={(e) => changeHandler(e)}
//                                                 onChange={(e) => changeHandler(e)}
//                                             />
//                                             {validator.message('password', value.password, 'required')}
//                                         </div>
//                                         <div className="form-check">
//                                             <input className="form-check-input" type="checkbox" id="checkbox_remember_me" />
//                                             <label className="form-check-label" htmlFor="checkbox_remember_me">
//                                                 By continuing you agree to our <Link href="/sign_in"><u>Terms and Conditions</u></Link>
//                                             </label>
//                                         </div>
//                                         <button className="btn" type="submit">
//                                             <span className="btn_label">Register</span>
//                                             <span className="btn_icon"><i className="ti-arrow-top-right"></i></span>
//                                         </button>
//                                     </form>
//                                     <div className="decoration_item shape_flower">
//                                         <Image src={shape2} alt="Flower" />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </main>
//             </div>
//         </Fragment>
//     )
// };
// export default SigninPage;