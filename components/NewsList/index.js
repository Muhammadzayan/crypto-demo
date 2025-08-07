import { useRef, useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import BlogSidebar from "../BlogSidebar";
import Image from "next/image";

const NewsList = (props) => {
	const prevRef = useRef(null);
	const nextRef = useRef(null);
	const swiperRef = useRef(null);
	const [newsData, setNewsData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(6); // Number of news items per page

	useEffect(() => {
		if (swiperRef.current && prevRef.current && nextRef.current) {
			swiperRef.current.params.navigation.prevEl = prevRef.current;
			swiperRef.current.params.navigation.nextEl = nextRef.current;
			swiperRef.current.navigation.init();
			swiperRef.current.navigation.update();
		}
	}, []);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/frontend/crypto-news");
				const data = await response.json();
				console.log("Fetched news data:", data);
				setNewsData(data);
			} catch (error) {
				console.error("Error fetching news:", error);
				// Fallback to mock data if API fails
				const { cryptoNews } = await import(
					"../../pages/api/frontend/crypto-news"
				);
				setNewsData(cryptoNews);
			} finally {
				setLoading(false);
			}
		};

		fetchNews();
	}, []);

	const ClickHandler = () => {
		window.scrollTo(10, 0);
	};

	// Function to render image with proper error handling
	const renderImage = (news) => {
		const imageSrc =
			news.screens || news.image || "/images/blogs/blog_post_image_1.webp";

		// Check if it's an external URL (starts with http)
		const isExternalImage = imageSrc.startsWith("http");

		if (isExternalImage) {
			// For external images, use regular img tag to avoid Next.js Image restrictions
			return (
				<img
					src={imageSrc}
					alt={news.title || "News Image"}
					style={{
						width: "100%",
						height: "auto",
						maxHeight: "300px",
						objectFit: "cover",
						borderRadius: "8px",
					}}
					onError={(e) => {
						// Fallback to default image if external image fails to load
						e.target.src = "/images/blogs/blog_post_image_1.webp";
					}}
				/>
			);
		} else {
			// For local images, use Next.js Image component
			return (
				<Image
					src={imageSrc}
					alt={news.title || "News Image"}
					width={400}
					height={300}
					style={{
						width: "100%",
						height: "auto",
						maxHeight: "300px",
						objectFit: "cover",
						borderRadius: "8px",
					}}
				/>
			);
		}
	};

	// Pagination calculations
	const totalPages = Math.ceil(newsData.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentNewsData = newsData.slice(startIndex, endIndex);

	// Function to handle page changes
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
		window.scrollTo(0, 0); // Scroll to top when page changes
	};

	// Function to generate pagination items
	const generatePaginationItems = () => {
		const items = [];
		const maxVisiblePages = 5; // Maximum number of page buttons to show

		if (totalPages <= maxVisiblePages) {
			// Show all pages if total is small
			for (let i = 1; i <= totalPages; i++) {
				items.push(i);
			}
		} else {
			// Show smart pagination with ellipsis
			if (currentPage <= 3) {
				// Near the beginning
				for (let i = 1; i <= 4; i++) {
					items.push(i);
				}
				items.push("...");
				items.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				// Near the end
				items.push(1);
				items.push("...");
				for (let i = totalPages - 3; i <= totalPages; i++) {
					items.push(i);
				}
			} else {
				// In the middle
				items.push(1);
				items.push("...");
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					items.push(i);
				}
				items.push("...");
				items.push(totalPages);
			}
		}

		return items;
	};

	if (loading) {
		return (
			<section className='blog_section section_space pt-0'>
				<div className='container'>
					<div className='text-center py-5'>
						<div className='spinner-border' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</div>
						<p className='mt-3'>Loading latest news...</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className='blog_section section_space pt-0'>
			<div className='container'>
				<div className='blog_carousel_block swiper'>
					<div className='swiper-wrapper'>
						<Swiper
							modules={[Navigation]}
							spaceBetween={50}
							slidesPerView={1}
							loop={true}
							speed={1800}
							parallax={true}
							ref={swiperRef}
							onBeforeInit={(swiper) => {
								swiperRef.current = swiper;
							}}>
							{newsData.slice(0, 2).map((news, Nitem) => (
								<SwiperSlide
									key={Nitem}
									style={{
										backgroundImage: `url(${news.screens || news.image})`,
									}}>
									<div className='post_info' key={Nitem}>
										<div className='badge'>{news.category}</div>
										<h3 className='blog_post_title'>
											<Link
												onClick={ClickHandler}
												href={"/blog-single/[slug]"}
												as={`/blog-single/${news.slug}`}>
												{news.title}
											</Link>
										</h3>
										<p className='blog_post_description mb-0'>
											{news.description}
										</p>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className='bc-pagination'></div>
					<button
						className='bc-button-prev'
						type='button'
						ref={prevRef}
						style={{
							backgroundImage: `url(${"/images/shapes/shape_left.svg"})`,
						}}>
						<i className='fa-solid fa-angles-left'></i>
					</button>
					<button
						className='bc-button-next'
						type='button'
						ref={nextRef}
						style={{
							backgroundImage: `url(${"/images/shapes/shape_right.svg"})`,
						}}>
						<i className='fa-solid fa-angles-right'></i>
					</button>
				</div>
				<div className='row justify-content-lg-between'>
					<div className='col-lg-8'>
						{/* News items with pagination */}
						{currentNewsData.map((news, Nitem) => (
							<div className='blog_post_left_image' key={Nitem}>
								<Link
									onClick={ClickHandler}
									href={"/blog-single/[slug]"}
									as={`/blog-single/${news.slug}`}
									className='post_image'>
									{renderImage(news)}
								</Link>
								<div className='post_info'>
									<Link
										onClick={ClickHandler}
										href={"/blog-single/[slug]"}
										as={`/blog-single/${news.slug}`}
										className='blog_post_category'>
										{news.category}
									</Link>
									<h3 className='blog_post_title'>
										<Link
											onClick={ClickHandler}
											href={"/blog-single/[slug]"}
											as={`/blog-single/${news.slug}`}>
											{news.title}
										</Link>
									</h3>
									<p className='blog_post_description'>{news.description}</p>
									<Link
										onClick={ClickHandler}
										href={"/blog-single/[slug]"}
										as={`/blog-single/${news.slug}`}
										className='btn'>
										<span className='btn_label'>Read More</span>
										<span className='btn_icon'>
											<i className='fa-solid fa-arrow-up-right'></i>
										</span>
									</Link>
								</div>
							</div>
						))}

						{/* Pagination */}
						{totalPages > 1 && (
							<ul className='pagination_nav pt-3 unordered_list justify-content-center'>
								{/* Previous button */}
								<li>
									<Link
										onClick={() => {
											handlePageChange(Math.max(1, currentPage - 1));
											ClickHandler();
										}}
										href='#'
										style={{
											pointerEvents: currentPage === 1 ? "none" : "auto",
											opacity: currentPage === 1 ? 0.5 : 1,
										}}>
										<i className='fa-solid fa-angles-left'></i>
									</Link>
								</li>

								{/* Page numbers */}
								{generatePaginationItems().map((item, index) => (
									<li
										key={index}
										className={currentPage === item ? "active" : ""}>
										{item === "..." ? (
											<Link onClick={ClickHandler} href='#'>
												...
											</Link>
										) : (
											<Link
												onClick={() => {
													handlePageChange(item);
													ClickHandler();
												}}
												href='#'>
												{item}
											</Link>
										)}
									</li>
								))}

								{/* Next button */}
								<li>
									<Link
										onClick={() => {
											handlePageChange(Math.min(totalPages, currentPage + 1));
											ClickHandler();
										}}
										href='#'
										style={{
											pointerEvents:
												currentPage === totalPages ? "none" : "auto",
											opacity: currentPage === totalPages ? 0.5 : 1,
										}}>
										<i className='fa-solid fa-angles-right'></i>
									</Link>
								</li>
							</ul>
						)}

						{/* Page info */}
						{totalPages > 1 && (
							<div className='text-center mt-3'>
								<p className='text-muted'>
									Showing {startIndex + 1} to{" "}
									{Math.min(endIndex, newsData.length)} of {newsData.length}{" "}
									news articles
								</p>
							</div>
						)}
					</div>
					<div className='col-lg-4'>
						<BlogSidebar />
					</div>
				</div>
			</div>
		</section>
	);
};

export default NewsList;
