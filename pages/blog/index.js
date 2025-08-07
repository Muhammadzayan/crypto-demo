import React, { Fragment } from "react";
import PageTitle from "../../components/pagetitle/PageTitle";
import Header from "../../components/header/Header";
import NewsList from "../../components/NewsList";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";

const BlogPage = (props) => {
	return (
		<Fragment>
			<div className='index_ico page_wrapper'>
				<Header />
				<main className='page_content'>
					<PageTitle
						pageTitle={"Latest News"}
						pagesub={"Crypto & Financial News"}
					/>
					<NewsList />
				</main>
				<Footer />
				<Scrollbar />
			</div>
		</Fragment>
	);
};
export default BlogPage;
