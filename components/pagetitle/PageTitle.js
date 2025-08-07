import React from 'react'
import Link from 'next/link';


const PageTitle = (props) => {
    return (
        <section className="page_header text-center">
            <div className="container">
                <h1 className="page_title">
                    {props.pageTitle}
                </h1>
                <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item"><Link href="/">{props.pagesub}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{props.pageTitle}</li>
                </ol>
            </div>
        </section>
    )
}

export default PageTitle;