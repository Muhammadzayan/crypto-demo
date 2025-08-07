// import React, { Fragment } from 'react';
// import blogs from '../../pages/api/admin/blogs';
// import { useRouter } from 'next/router'
// import BlogSingle from '../../components/BlogDetails/BlogDetails';
// import PageTitle from '../../components/pagetitle/PageTitle';
// import Header from '../../components/header/Header';
// import Scrollbar from '../../components/scrollbar/scrollbar'
// import Footer from '../../components/footer/Footer';


// const BlogDetails = (props) => {

//     const router = useRouter()

//     const BlogDetails = blogs.find(item => item.slug === router.query.slug)

//     return (
//         <Fragment>
//             <div className='index_ico page_wrapper'>
//                 <Header />
//                 <main className="page_content">
//                     <PageTitle pageTitle={BlogDetails?.title} pagesub={'Home'} />
//                     <BlogSingle />
//                 </main>
//                 <Footer />
//                 <Scrollbar />
//             </div>
//         </Fragment>
//     )
// };
// export default BlogDetails;

import { Fragment } from 'react';
import { useRouter } from 'next/router';
import BlogSingle from '../../components/BlogDetails/BlogDetails';
import PageTitle from '../../components/pagetitle/PageTitle';
import Header from '../../components/header/Header';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Footer from '../../components/footer/Footer';

const BlogDetailsPage = ({ blog }) => {
  return (
    <Fragment>
      <div className="index_ico page_wrapper">
        <Header />
        <main className="page_content">
          <PageTitle pageTitle={blog?.title || 'Blog'} pagesub="Home" />
          <BlogSingle blog={blog} />
        </main>
        <Footer />
        <Scrollbar />
      </div>
    </Fragment>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/blogs?slug=${slug}`);
  const data = await res.json();

  const blog = data.blogs?.find((item) => item.slug === slug) || null;

  return {
    props: { blog },
  };
}

export default BlogDetailsPage;
