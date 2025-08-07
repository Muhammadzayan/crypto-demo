import React, { Fragment } from 'react';
import Header from '../../components/header/Header';
import Link from 'next/link'
import PageTitle from '../../components/pagetitle/PageTitle';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/footer/Footer';

const ErrorPage = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <Fragment>
            <div className='index_ico page_wrapper'>
                <Header />
                <main className="page_content">
                    <PageTitle pageTitle={'404'} pagesub={'Error 🙂'} pageTop={'404'} />
                    <section className="error-page section_space pt-0">
                        <div className="container not-found-content">
                            <div className="row justify-content-center">
                                <div className="col-lg-12">
                                    <div className="contant-wrapper text-center">
                                        <div className="error-page__content mb-50">
                                            <h2 className='mb-3'>Hi Sorry We Can’t Find That Page!</h2>
                                            <p>Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>

                                            <div className="error-page-button mt-4">
                                                <Link onClick={ClickHandler} href="/" className="btn">
                                                    <span className="btn_label" data-text="Go Back Home">Go Back Home</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
            <Scrollbar />
        </Fragment>
    )
};

export default ErrorPage;