import React, { useState } from 'react'
import SimpleReactValidator from 'simple-react-validator';


const ContactForm = (props) => {

    const [forms, setForms] = useState({
        name: '',
        email: '',
        subject: '',
        phone: '',
        company: '',
        message: ''
    });
    const [validator] = useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));
    const changeHandler = e => {
        setForms({ ...forms, [e.target.name]: e.target.value })
        if (validator.allValid()) {
            validator.hideMessages();
        } else {
            validator.showMessages();
        }
    };

    const submitHandler = e => {
        e.preventDefault();
        if (validator.allValid()) {
            validator.hideMessages();
            setForms({
                name: '',
                email: '',
                subject: '',
                phone: '',
                company: '',
                message: ''
            })
        } else {
            validator.showMessages();
        }
    };

    return (
        <form action="#" onSubmit={(e) => submitHandler(e)}>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="input_title" htmlFor="input_name">Name<sup>*</sup></label>
                        <div className="input-box">
                            <input
                                value={forms.name}
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Carlo Castillo"
                                onBlur={(e) => changeHandler(e)}
                                onChange={(e) => changeHandler(e)} />
                            {validator.message('name', forms.name, 'required|alpha_space')}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="input_title" htmlFor="input_email">Email<sup>*</sup></label>
                        <input
                            value={forms.email}
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="alma.lawson@example.com"
                            onBlur={(e) => changeHandler(e)}
                            onChange={(e) => changeHandler(e)} />
                        {validator.message('email', forms.email, 'required|email')}
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <label className="input_title" htmlFor="input_phone">Phone<sup>*</sup></label>
                        <div className="input-box">
                            <input
                                value={forms.phone}
                                type="phone"
                                name="phone"
                                className="form-control"
                                placeholder="(+880) 1680-6361-89"
                                onBlur={(e) => changeHandler(e)}
                                onChange={(e) => changeHandler(e)} />
                            {validator.message('phone', forms.phone, 'required|phone')}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="input_title" htmlFor="input_message">Cover Letter<sup>*</sup></label>
                        <textarea
                            onBlur={(e) => changeHandler(e)}
                            onChange={(e) => changeHandler(e)}
                            value={forms.message}
                            type="text"
                            name="message"
                            className="form-control"
                            placeholder="Write about your self...">
                        </textarea>
                        {validator.message('message', forms.message, 'required')}
                    </div>
                    <button className="btn" type="submit">
                        <span className="btn_label">Post Comment</span>
                        <span className="btn_icon"><i className="fa-solid fa-arrow-up-right"></i></span>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ContactForm;