// import React from 'react';
// import blogs from '../../pages/api/admin/blogs';
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import BlogSidebar from '../BlogSidebar';
// import blog1 from '/assets/frontend/public/images/blogs/blog_details_image_1.webp'
// import blog2 from '/assets/frontend/public/images/blogs/blog_details_image_2.webp'
// import blog3 from '/assets/frontend/public/images/blogs/blog_details_image_3.webp'
// import blog4 from '/assets/frontend/public/images/blogs/blog_details_image_4.webp'
// import avatar1 from '/assets/frontend/public/images/avatars/avatar_9.webp'
// import avatar2 from '/assets/frontend/public/images/avatars/avatar_10.webp'
// import avatar3 from '/assets/frontend/public/images/avatars/avatar_11.webp'
// import avatar4 from '/assets/frontend/public/images/avatars/avatar_12.webp'
// import Image from 'next/image';

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BlogSidebar from "../BlogSidebar";
import Image from "next/image";

import blog1 from "/assets/frontend/public/images/blogs/blog_details_image_1.webp";
import blog2 from "/assets/frontend/public/images/blogs/blog_details_image_2.webp";
import blog3 from "/assets/frontend/public/images/blogs/blog_details_image_3.webp";
import blog4 from "/assets/frontend/public/images/blogs/blog_details_image_4.webp";
import avatar1 from "/assets/frontend/public/images/avatars/avatar_9.webp";
import avatar2 from "/assets/frontend/public/images/avatars/avatar_10.webp";
import avatar3 from "/assets/frontend/public/images/avatars/avatar_11.webp";
import avatar4 from "/assets/frontend/public/images/avatars/avatar_12.webp";

const BlogSingle = (props) => {
	const router = useRouter();

	const BlogDetails = blogs.find((item) => item.slug === router.query.slug);

	const ClickHandler = () => {
		window.scrollTo(10, 0);
	};

	return (
		<section className='blog_details_section'>
			<div className='container'>
				<div className='details_image'>
					<Image src={blog1} alt='Blog Details' />
				</div>
				<div className='details_content'>
					<ul className='post_meta style_2 unordered_list'>
						<li>
							<Link
								onClick={ClickHandler}
								href='/blog'
								className='post_category'>
								{BlogDetails?.thumb}
							</Link>
						</li>
						<li>
							<Link onClick={ClickHandler} href={"/blog"}>
								<i className='fa-regular fa-calendar-days'></i>
								Last Update: {BlogDetails?.create_at}
							</Link>
						</li>
					</ul>
					<h2 className='details_title'>{BlogDetails?.title}</h2>
					<p>
						ICOs have revolutionized the crypto space by offering a unique way
						to fund blockchain projects while providing early investment
						opportunities to Bitcoin and cryptocurrency enthusiasts. They enable
						investors to support innovative ideas and gain access to tokens with
						potential for significant growth.
					</p>
					<ul className='post_meta unordered_list'>
						<li>
							<Link onClick={ClickHandler} href={"/blog"}>
								<i className='fa-regular fa-user'></i>
								by {BlogDetails?.author}
							</Link>
						</li>
						<li>
							<Link onClick={ClickHandler} href={"/blog"}>
								<i className='fa-regular fa-comments'></i>
								{BlogDetails?.comment} Comments
							</Link>
						</li>
						<li>
							<Link onClick={ClickHandler} href={"/blog"}>
								<i className='fa-regular fa-eye'></i>
								20k Views
							</Link>
						</li>
					</ul>
				</div>
				<hr />
				<div className='row justify-content-lg-between'>
					<div className='col-lg-8'>
						<div className='details_content'>
							<div className='post_audio'>
								<button className='audio_play_btn' type='button'>
									<i className='fa-solid fa-play'></i>
									<span>6:24</span>
									<span>Listen to this article!</span>
								</button>
							</div>
							<h3 className='details_info_title'>
								Revolutionizing Crypto Investment Navigating Growth with ICO
								Innovation in Bitcoin and Blockchain.
							</h3>
							<div className='row mb-4'>
								<div className='col-md-6 col-sm-6'>
									<div className='details_image m-0'>
										<Image src={blog2} alt='Blog Details' />
									</div>
								</div>
								<div className='col-md-6 col-sm-6'>
									<div className='details_image m-0'>
										<Image src={blog3} alt='Blog Details' />
									</div>
								</div>
							</div>
							<p>
								ICOs are transforming the landscape of crypto investment by
								offering innovative opportunities that fuel growth within the
								Bitcoin and blockchain space. They allow investors to engage
								early with emerging projects, providing access to groundbreaking
								technologies and potentially high-reward investments. Through
								ICOs, investors can support the development of new blockchain,
								while also benefiting from the growth and expansion of the
								ecosystem. This shift is reshaping how capital is raised, making
								ICOs a key driver of innovation in the industry.
							</p>
							<p>
								As blockchain continues to revolutionize industries from finance
								to supply chain management, ICOs are emerging as a vital tool
								for project funding and development. Investors who engage in
								ICOs not only get the chance to be part of cutting-edge
								technology but also stand to benefit from early-stage growth,
								which could lead to significant returns. This evolving model is
								driving both innovation and the expansion of the cryptocurrency.
							</p>
							<div className='iframe_block'>
								<iframe
									src='https://www.youtube.com/embed/VYWc9dFqROI'
									title='Explain Crypto To COMPLETE Beginners: Coin Bureau Guide!!'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
									referrerPolicy='strict-origin-when-cross-origin'
									allowFullScreen></iframe>
							</div>
							<h3 className='details_info_title'>
								Optimizing Growth with ICOs.
							</h3>
							<p>
								Optimizing growth with ICOs offers investors and blockchain
								projects a powerful way to accelerate development and maximize
								returns. By allowing projects to raise capital directly from the
								public, ICOs streamline funding while providing early investors
								with the potential for significant gains. This model enables
								faster scalability for blockchain technologies, as it bypasses
								traditional financing routes. For investors, ICOs present an
								opportunity to engage in the growth of groundbreaking projects
								from the start, positioning them for long-term.
							</p>
							<div className='row mb-4 align-items-center'>
								<div className='col-md-6'>
									<div className='details_image m-0'>
										<Image src={blog4} alt='Blog' />
									</div>
								</div>
								<div className='col-md-6'>
									<ul className='iconlist_block unordered_list_block'>
										<li>
											<span className='iconlist_icon'>
												<i className='fa-solid fa-circle'></i>
											</span>
											<span className='iconlist_label'>
												Direct Public Funding for Global Investment.
											</span>
										</li>
										<li>
											<span className='iconlist_icon'>
												<i className='fa-solid fa-circle'></i>
											</span>
											<span className='iconlist_label'>
												Early Investment with High Growth Potential.
											</span>
										</li>
										<li>
											<span className='iconlist_icon'>
												<i className='fa-solid fa-circle'></i>
											</span>
											<span className='iconlist_label'>
												Global Reach for Enhanced Exposure.
											</span>
										</li>
										<li>
											<span className='iconlist_icon'>
												<i className='fa-solid fa-circle'></i>
											</span>
											<span className='iconlist_label'>
												Increased Transparency with Clear Roadmaps.
											</span>
										</li>
										<li>
											<span className='iconlist_icon'>
												<i className='fa-solid fa-circle'></i>
											</span>
											<span className='iconlist_label'>
												Token Utility for Long-Term Value.
											</span>
										</li>
										<li>
											<span className='iconlist_icon'>
												<i className='fa-solid fa-circle'></i>
											</span>
											<span className='iconlist_label'>
												Accelerated Development through Funding.
											</span>
										</li>
									</ul>
								</div>
							</div>
							<h3 className='details_info_title'>
								3 Reasons ICOs Revolutionize Crypto.
							</h3>
							<p>
								Here are 3 key reasons emphasizing how ICOs are revolutionizing
								the cryptocurrency landscape and reshaping the future of
								blockchain technology:
							</p>
							<ul className='iconlist_block unordered_list_block'>
								<li>
									<span className='iconlist_label'>
										1. Democratizing Investment Opportunities.
									</span>
								</li>
								<li>
									<span className='iconlist_label'>
										2. Efficient Fundraising Model.
									</span>
								</li>
								<li>
									<span className='iconlist_label'>
										3. Driving Innovation and Growth.
									</span>
								</li>
							</ul>
							<div className='postabmin_block'>
								<div className='admin_image'>
									<Image src={avatar1} alt='Avatar' />
								</div>
								<div className='admin_content'>
									<h4 className='admin_name'>About Anderson</h4>
									<span className='admin_designation'>Content Editor</span>
									<p className='mb-4'>
										A content editor plays a pivotal role in shaping and
										refining the narrative and quality of digital content. This
										role involves.
									</p>
									<ul className='social_block style_3 unordered_list'>
										<li>
											<Link onClick={ClickHandler} href={"/blog"}>
												<i className='fa-brands fa-facebook-f'></i>
											</Link>
										</li>
										<li>
											<Link onClick={ClickHandler} href={"/blog"}>
												<i className='fa-brands fa-twitter'></i>
											</Link>
										</li>
										<li>
											<Link onClick={ClickHandler} href={"/blog"}>
												<i className='fa-brands fa-linkedin-in'></i>
											</Link>
										</li>
										<li>
											<Link onClick={ClickHandler} href={"/blog"}>
												<i className='fa-brands fa-instagram'></i>
											</Link>
										</li>
									</ul>
								</div>
							</div>
							<hr />
							<div className='row'>
								<div className='col-md-6'>
									<ul className='tags_block unordered_list'>
										<li>
											<Link onClick={ClickHandler} href={"/blog"}>
												Blockchain
											</Link>
										</li>
										<li>
											<Link onClick={ClickHandler} href={"/blog"}>
												Investments
											</Link>
										</li>
										<li>
											<Link onClick={ClickHandler} href={"/blog"}>
												ICO
											</Link>
										</li>
									</ul>
								</div>
								<div className='col-md-6'>
									<ul className='social_block style_4 unordered_list justify-content-lg-end'>
										<li>
											<Link onClick={ClickHandler} href={"/blog"}>
												<i className='fa-brands fa-facebook-f'></i>
											</Link>
										</li>
										<li>
											<Link onClick={ClickHandler} href={"/blog"}>
												<i className='fa-brands fa-twitter'></i>
											</Link>
										</li>
										<li>
											<Link onClick={ClickHandler} href={"/blog"}>
												<i className='fa-brands fa-linkedin-in'></i>
											</Link>
										</li>
										<li>
											<Link onClick={ClickHandler} href={"/blog"}>
												<i className='fa-brands fa-instagram'></i>
											</Link>
										</li>
										<li>
											<Link onClick={ClickHandler} href={"/blog"}>
												<i className='fa-solid fa-share-nodes'></i>
											</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className='other_post_nav'>
								<div className='post_nav_prev'>
									<Link onClick={ClickHandler} href='/blog' className='arrow'>
										<i className='fa-solid fa-arrow-left-long'></i>
									</Link>
									<div className='blog_post_info'>
										<h3 className='blog_post_title'>
											<Link onClick={ClickHandler} href='/blog'>
												10 Reasons Our ICO Is ..Poised for Success
											</Link>
										</h3>
										<Link
											onClick={ClickHandler}
											href='/blog'
											className='post_admin'>
											<i className='fa-regular fa-circle-user'></i> Christopher
										</Link>
									</div>
								</div>
								<Link
									onClick={ClickHandler}
									href='/blog'
									className='blog_page_link'>
									<i className='fa-solid fa-grid'></i>
								</Link>
								<div className='post_nav_next'>
									<Link onClick={ClickHandler} href='/blog' className='arrow'>
										<i className='fa-solid fa-arrow-right-long'></i>
									</Link>
									<div className='blog_post_info'>
										<h3 className='blog_post_title'>
											<Link onClick={ClickHandler} href='/blog'>
												The Role of Our ICO in Driving Financial..
											</Link>
										</h3>
										<Link
											onClick={ClickHandler}
											href='/blog'
											className='post_admin'>
											<i className='fa-regular fa-circle-user'></i> Michael
										</Link>
									</div>
								</div>
							</div>
							<hr />
							<div className='comment_area'>
								<h3 className='details_info_title'>Comments (3)</h3>
								<ul className='comments_list unordered_list_block'>
									<li>
										<div className='comment_item'>
											<div className='comment_author_thumbnail'>
												<Image
													src={avatar2}
													alt='Coinlye - Comment Author Avatar'
												/>
											</div>
											<div className='comment_author_content'>
												<h4 className='comment_author_name'>John Smith</h4>
												<div className='comment_time'>
													Dec 24, 2024 at 10:21am
												</div>
												<p className='mb-0'>
													"Working with Techco has been a game-changer. Their
													innovative IT solutions boosted our efficiency
													tenfold. Highly recommend!"
												</p>
												<Link
													onClick={ClickHandler}
													href='/blog'
													className='comment_reply_btn'>
													Reply
												</Link>
											</div>
										</div>
										<ul className='comments_list unordered_list_block'>
											<li>
												<div className='comment_item'>
													<div className='comment_author_thumbnail'>
														<Image
															src={avatar3}
															alt='Coinlye - Comment Author Avatar'
														/>
													</div>
													<div className='comment_author_content'>
														<h4 className='comment_author_name'>
															Daniel Garcia
														</h4>
														<div className='comment_time'>
															Dec 24, 2024 at 10:21am
														</div>
														<p className='mb-0'>
															"Our experience with Techco has been exceptional.
															Their commitment to customer satisfaction stands
															out. Grateful for their partnership."
														</p>
														<Link
															onClick={ClickHandler}
															href='/blog'
															className='comment_reply_btn'>
															Reply
														</Link>
													</div>
												</div>
											</li>
											<li>
												<div className='comment_item'>
													<div className='comment_author_thumbnail'>
														<Image
															src={avatar2}
															alt='Coinlye - Comment Author Avatar'
														/>
													</div>
													<div className='comment_author_content'>
														<h4 className='comment_author_name'>John Smith</h4>
														<div className='comment_time'>
															Dec 24, 2024 at 10:21am
														</div>
														<p className='mb-0'>
															"Working with Techco has been a game-changer.
															Their innovative IT solutions boosted our
															efficiency tenfold. Highly recommend!"
														</p>
														<Link
															onClick={ClickHandler}
															href='/blog'
															className='comment_reply_btn'>
															Reply
														</Link>
													</div>
												</div>
											</li>
										</ul>
									</li>
									<li>
										<div className='comment_item'>
											<div className='comment_author_thumbnail'>
												<Image
													src={avatar4}
													alt='Coinlye - Comment Author Avatar'
												/>
											</div>
											<div className='comment_author_content'>
												<h4 className='comment_author_name'>John Smith</h4>
												<div className='comment_time'>
													Dec 24, 2024 at 10:21am
												</div>
												<p className='mb-0'>
													"Working with Techco has been a game-changer. Their
													innovative IT solutions boosted our efficiency
													tenfold. Highly recommend!"
												</p>
												<Link
													onClick={ClickHandler}
													href='/blog'
													className='comment_reply_btn'>
													Reply
												</Link>
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div className='comment_form'>
								<h3 className='details_info_title'>Leave a reply</h3>
								<p>
									Your email address will not be published. Required fields are
									marked *
								</p>
								<form action='#'>
									<div className='row'>
										<div className='col-md-6'>
											<div className='form-group'>
												<label className='input_title' htmlFor='input_name'>
													Name<sup>*</sup>
												</label>
												<input
													id='input_name'
													className='form-control'
													type='text'
													name='name'
													placeholder='Carlo Castillo'
													required
												/>
											</div>
										</div>
										<div className='col-md-6'>
											<div className='form-group'>
												<label className='input_title' htmlFor='input_email'>
													Email<sup>*</sup>
												</label>
												<input
													id='input_email'
													className='form-control'
													type='email'
													name='email'
													placeholder='alma.lawson@example.com'
													required
												/>
											</div>
										</div>
										<div className='col-12'>
											<div className='form-group'>
												<label className='input_title' htmlFor='input_message'>
													Cover Letter<sup>*</sup>
												</label>
												<textarea
													id='input_message'
													className='form-control'
													name='message'
													placeholder='Write about your self...'
													required></textarea>
											</div>
											<div className='form-check mb-5'>
												<input
													className='form-check-input'
													type='checkbox'
													id='checkbox_save'
												/>
												<label
													className='form-check-label'
													htmlFor='checkbox_save'>
													Save my name, email, and website in this browser for
													the next time I comment.
												</label>
											</div>
											<button className='btn' type='submit'>
												<span className='btn_label'>Post Comment</span>
												<span className='btn_icon'>
													<i className='fa-solid fa-arrow-up-right'></i>
												</span>
											</button>
										</div>
									</div>
								</form>
							</div>
							<div className='subscribe_box'>
								<div className='bell_icon'>
									<i className='fa-solid fa-bell'></i>
								</div>
								<h3 className='heading_text'>Subscribe to Our Updates</h3>
								<p className='mb-4'>
									Stay up to date! Get all of our resources and news delivered
									straight to your inbox.
								</p>
								<form className='ico_newsletter_form' action='#'>
									<input
										type='email'
										name='email'
										placeholder='coinlye@example.com'
									/>
									<button className='submit_btn' type='submit'>
										Subscribe
									</button>
								</form>
							</div>
						</div>
					</div>
					<div className='col-lg-4'>
						<BlogSidebar />
					</div>
				</div>
			</div>
			<section className='related_post_section section_space'>
				<div className='container'>
					<div className='ico_heading_block'>
						<h2 className='heading_text'>Browse Related Blog</h2>
					</div>

					<div className='row'>
						{blogs.slice(2, 5).map((blog, Bitem) => (
							<div className='col-lg-4' key={Bitem}>
								<div className='blog_card_block'>
									<Link
										onClick={ClickHandler}
										href={"/blog-single/[slug]"}
										as={`/blog-single/${blog.slug}`}
										className='blog_post_image'>
										<Image src={blog.screens} alt='Post' />
									</Link>
									<ul className='post_meta style_2 unordered_list'>
										<li>
											<Link
												onClick={ClickHandler}
												href={"/blog-single/[slug]"}
												as={`/blog-single/${blog.slug}`}
												className='post_category'>
												{blog.thumb}
											</Link>
										</li>
										<li>
											<Link
												onClick={ClickHandler}
												href={"/blog-single/[slug]"}
												as={`/blog-single/${blog.slug}`}>
												By {blog.author}
											</Link>
										</li>
									</ul>
									<h3 className='blog_post_title'>
										<Link
											onClick={ClickHandler}
											href={"/blog-single/[slug]"}
											as={`/blog-single/${blog.slug}`}>
											{blog.title}
										</Link>
									</h3>
									<Link
										onClick={ClickHandler}
										href={"/blog-single/[slug]"}
										as={`/blog-single/${blog.slug}`}
										className='btn_link'>
										<span className='btn_label'>Read More</span>
										<span className='btn_icon'>
											<i className='fa-solid fa-arrow-right'></i>
										</span>
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</section>
	);
};

export default BlogSingle;
