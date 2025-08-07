import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { FiTrash2, FiEye, FiSearch, FiPlus, FiEdit } from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

Modal.setAppElement("#__next");

export default function ManageNews() {
	const [blogs, setBlogs] = useState([]);
	const [selectedBlog, setSelectedBlog] = useState(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [addModalIsOpen, setAddModalIsOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [categories, setCategories] = useState([]);
	const [isEditMode, setIsEditMode] = useState(false);
	const [editId, setEditId] = useState(null);

	const updateBlogStatus = async (id, newStatus) => {
		try {
			const res = await fetch("/api/admin/blogs/status", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id, status: newStatus }),
			});

			const data = await res.json();
			if (data.success) {
				toast.success(`Status updated to "${newStatus}"`);
				fetchBlogs(); // Refresh data
			} else {
				toast.error(data.message || "Failed to update status");
			}
		} catch (error) {
			console.error("Status update error:", error);
			toast.error("Something went wrong while updating status");
		}
	};

	const initialFormData = {
		title: "",
		slug: "",
		description: "",
		content: "",
		author: "",
		category_id: "",
		time_read: "",
		status: 1,
		image: "",
		tags: [],
	};

	const handleEditClick = (blog) => {
		setSelectedBlog(blog); // ✅ Move all blog data to selectedBlog
		setIsEditMode(true); // ✅ This triggers the above useEffect
		setEditId(blog.id);
		setAddModalIsOpen(true);
	};

	const handleUpdateBlog = async () => {
		try {
			const response = await fetch("/api/admin/blogs", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...formData, id: editId }),
			});

			const data = await response.json();
			if (data.success) {
				toast.success("News article updated successfully");
				fetchBlogs();
				setAddModalIsOpen(false);
				setIsEditMode(false);
				setFormData(initialFormData); // clear form
			} else {
				toast.error(data.message || "Update failed");
			}
		} catch (err) {
			console.error(err);
			toast.error("Something went wrong");
		}
	};

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();

			if (data.success) {
				setFormData((prev) => ({ ...prev, image: data.url })); // save only the file path like /uploads/xyz.jpg
			} else {
				console.error("Upload failed", data.message);
			}
		} catch (err) {
			console.error("Image upload error:", err);
		}
	};

	const [formData, setFormData] = useState({
		title: "",
		slug: "",
		description: "",
		content: "",
		author: "",
		category_id: "",
		time_read: "",
		status: "draft", // ✅ Default to 'draft'
		image: "",
		tags: [],
	});

	const itemsPerPage = 5;

	useEffect(() => {
		fetchBlogs();
		fetchCategories();
	}, []);

	useEffect(() => {
		if (isEditMode && editId && selectedBlog) {
			setFormData({
				title: selectedBlog.title || "",
				slug: selectedBlog.slug || "",
				author: selectedBlog.author || "",
				category_id: selectedBlog.category_id || "",
				time_read: selectedBlog.time_read || "",
				image: selectedBlog.image || "",
				tags: selectedBlog.tags ? selectedBlog.tags.split(",") : [],
				description: selectedBlog.description || "",
				content: selectedBlog.content || "",
				status: selectedBlog.status || 1,
			});
		}
	}, [isEditMode, editId, selectedBlog]); // ✅ depend only on these

	const fetchBlogs = async () => {
		const res = await fetch("/api/admin/blogs");
		const data = await res.json();

		console.log("Blogs fetched:", data.blogs);
		setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
	};

	const fetchCategories = async () => {
		const res = await fetch("/api/admin/categories/category");
		const data = await res.json();
		setCategories(Array.isArray(data) ? data : []);
	};

	const handleDeleteBlog = async (id) => {
		const res = await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
		const data = await res.json();
		if (data.success) {
			toast.success("News article deleted!");
			fetchBlogs();
		} else {
			toast.error(data.message || "Failed to delete blog");
		}
	};

	const openBlogModal = (blog) => {
		setSelectedBlog(blog);
		setModalIsOpen(true);
	};

	const openAddModal = () => {
		setAddModalIsOpen(true);
	};

	const handleAddBlog = async () => {
		const res = await fetch("/api/admin/blogs", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});
		const data = await res.json();
		if (data.success) {
			toast.success("News article added successfully!");
			fetchBlogs();
			setAddModalIsOpen(false);
			setFormData({
				title: "",
				slug: "",
				description: "",
				content: "",
				author: "",
				category_id: "",
				time_read: "",
				status: 1,
				image: "",
				tags: [],
			});
		} else {
			toast.error(data.message || "Failed to add blog");
		}
	};

	const filteredBlogs = blogs.filter((blog) =>
		`${blog.title} ${blog.author}`
			.toLowerCase()
			.includes(searchTerm.toLowerCase())
	);

	const paginatedBlogs = filteredBlogs.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);

	const closeModal = () => {
		setAddModalIsOpen(false);
		setIsEditMode(false);
		setEditId(null);
		setFormData(initialFormData);
	};

	return (
		<DashboardLayout>
			<div className='category-container'>
				<div className='category-header'>
					<h2>Manage News</h2>
					<div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
						<div className='search-input-wrapper'>
							<FiSearch className='search-icon' />
							<input
								type='text'
								className='search-input'
								placeholder='Search by news title or author...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<button
							className='save-btn'
							style={{
								padding: "10px",
								display: "flex",
								width: "50%",
								borderRadius: "30px",
								alignItems: "center",
							}}
							onClick={openAddModal}>
							<FiPlus style={{ marginRight: "0px" }} /> Add New
						</button>
					</div>
				</div>

				<table className='category-table'>
					<thead>
						<tr>
							<th style={{ textAlign: "center" }}>#</th>
							<th style={{ textAlign: "left" }}>Title</th>
							<th style={{ textAlign: "left" }}>Author</th>
							<th style={{ textAlign: "left" }}>Status</th>
							<th style={{ textAlign: "center" }}>Actions</th>
						</tr>
					</thead>
					<tbody>
						{paginatedBlogs.map((blog, index) => (
							<tr key={blog.id} style={{ textAlign: "center" }}>
								<td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
								<td style={{ textAlign: "left" }}>{blog.title}</td>
								<td style={{ textAlign: "left" }}>{blog.author}</td>
								<td style={{ textAlign: "center" }}>
									<select
										value={blog.status}
										onChange={(e) => updateBlogStatus(blog.id, e.target.value)}
										style={{
											padding: "4px 8px",
											borderRadius: "5px",
											fontSize: "13px",
										}}>
										<option value='published'>Published</option>
										<option value='draft'>Draft</option>
										<option value='pending'>Pending</option>
									</select>
								</td>

								<td>
									<button
										className='btn-secondary'
										onClick={() => openBlogModal(blog)}
										style={{
											marginRight: "10px",
											display: "inline-flex",
											alignItems: "center",
											gap: "5px",
										}}>
										<FiEye />
									</button>

									<button
										className='btn-secondary'
										onClick={() => handleEditClick(blog)}
										style={{
											marginRight: "10px",
											display: "inline-flex",
											alignItems: "center",
											gap: "5px",
										}}>
										<FiEdit />
									</button>

									<button
										className='btn-secondary'
										onClick={() => handleDeleteBlog(blog.id)}
										style={{
											display: "inline-flex",
											alignItems: "center",
											gap: "5px",
										}}>
										<FiTrash2 />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{totalPages > 1 && (
					<div className='pagination'>
						{Array.from({ length: totalPages }).map((_, index) => (
							<button
								key={index}
								className={`page-btn ${
									currentPage === index + 1 ? "active" : ""
								}`}
								onClick={() => setCurrentPage(index + 1)}>
								{index + 1}
							</button>
						))}
					</div>
				)}

				{/* View Blog Modal */}
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={() => setModalIsOpen(false)}
					contentLabel='Blog Details'
					overlayClassName='modal-overlay'
					className='modal-content modal-xlarge'
					closeTimeoutMS={300}>
					<div className='modal-scroll-body'>
						{selectedBlog && (
							<div className='modal-view-info'>
								<h3>{selectedBlog.title}</h3>
								<p>
									<strong>Slug:</strong> {selectedBlog.slug}
								</p>
								<div>
									<strong>Description:</strong>
									<div
										dangerouslySetInnerHTML={{
											__html: selectedBlog.description,
										}}
									/>
								</div>
								{selectedBlog.tags && (
									<p>
										<strong>Tags:</strong>{" "}
										{Array.isArray(selectedBlog.tags)
											? selectedBlog.tags.map((tag, idx) => (
													<span
														key={idx}
														style={{ marginRight: "8px", color: "#0070f3" }}>
														#{tag.trim()}
													</span>
											  ))
											: selectedBlog.tags.split(",").map((tag, idx) => (
													<span
														key={idx}
														style={{ marginRight: "8px", color: "#0070f3" }}>
														#{tag.trim()}
													</span>
											  ))}
									</p>
								)}
								<p>
									<strong>Author:</strong> {selectedBlog.author}
								</p>
								<p>
									<strong>Read Time:</strong> {selectedBlog.time_read} min
								</p>
								<p>
									<strong>Status:</strong>{" "}
									{selectedBlog.status === 1 ? "Active" : "Inactive"}
								</p>
								<p>
									<strong>Created At:</strong>{" "}
									{formatDistanceToNow(new Date(selectedBlog.created_at))} ago
								</p>

								{selectedBlog.image && (
									<div
										style={{
											width: "max-content",
											padding: "10px",
											border: "1px solid #eee",
											borderRadius: "8px",
										}}>
										<img
											src={selectedBlog.image}
											alt='Blog Cover'
											style={{ borderRadius: "8px" }}
										/>
									</div>
								)}
							</div>
						)}
					</div>
					<div className='modal-actions'>
						<button
							onClick={() => setModalIsOpen(false)}
							className='btn-cancel mb-3'>
							Close
						</button>
					</div>
				</Modal>

				{/* Add Blog Modal */}
				<Modal
					isOpen={addModalIsOpen}
					onRequestClose={() => setAddModalIsOpen(false)}
					contentLabel='Add Blog'
					overlayClassName='modal-overlay'
					className='modal-content modal-large'
					closeTimeoutMS={300}>
					<h3>{isEditMode ? "Edit News Article" : "Add New News Article"}</h3>

					{/* Scrollable content wrapper */}
					<div className='modal-scroll-body'>
						<div className='form-grid'>
							{/* All your inputs here */}
							<input
								type='text'
								className='form-input'
								placeholder='Title'
								value={formData.title}
								onChange={(e) =>
									setFormData({ ...formData, title: e.target.value })
								}
							/>
							<input
								type='text'
								className='form-input'
								placeholder='Slug'
								value={formData.slug}
								onChange={(e) =>
									setFormData({ ...formData, slug: e.target.value })
								}
							/>
							<input
								type='text'
								className='form-input'
								placeholder='Author'
								value={formData.author}
								onChange={(e) =>
									setFormData({ ...formData, author: e.target.value })
								}
							/>
							<input
								type='text'
								className='form-input'
								placeholder='Time Read (min)'
								value={formData.time_read}
								onChange={(e) =>
									setFormData({ ...formData, time_read: e.target.value })
								}
							/>
							<select
								className='form-input'
								value={formData.category_id}
								onChange={(e) =>
									setFormData({ ...formData, category_id: e.target.value })
								}>
								<option selected disabled hidden>
									Select Category
								</option>
								{Array.isArray(categories) &&
									categories
										.filter((cat) => cat.status === 1) // ✅ Only show active categories
										.map((cat) => (
											<option key={cat.id} value={cat.id}>
												{cat.name}
											</option>
										))}
							</select>

							<select
								className='form-input'
								value={formData.status}
								onChange={(e) =>
									setFormData({ ...formData, status: e.target.value })
								}>
								<option value='published'>Published</option>
								<option value='draft'>Draft</option>
								<option value='pending'>Pending</option>
							</select>

							<input
								type='text'
								className='form-input'
								placeholder='Tags (comma separated)'
								value={formData.tags.join(",")}
								onChange={(e) =>
									setFormData({ ...formData, tags: e.target.value.split(",") })
								}
							/>

							<input
								type='file'
								accept='image/*'
								className='form-input'
								onChange={handleImageUpload}
							/>
							{formData.image && (
								<div style={{ marginTop: "10px" }}>
									<img
										src={formData.image}
										alt='Preview'
										style={{ width: "100%", maxWidth: "300px" }}
									/>
								</div>
							)}
						</div>

						<div className='form-editor'>
							<label>
								<strong>Short Description</strong>
							</label>
							<ReactQuill
								value={formData.description}
								onChange={(value) =>
									setFormData({ ...formData, description: value })
								}
								placeholder='Short Description'
								style={{ height: "150px", marginBottom: "60px" }}
							/>

							<label>
								<strong>Content</strong>
							</label>
							<ReactQuill
								value={formData.content}
								onChange={(value) =>
									setFormData({ ...formData, content: value })
								}
								placeholder='Main Content'
								style={{ height: "200px" }}
							/>
						</div>
					</div>

					<div className='modal-actions'>
						<button
							onClick={() => setAddModalIsOpen(false)}
							onRequestClose={closeModal}
							className='cancel-btn'>
							Cancel
						</button>
						<button
							onClick={isEditMode ? handleUpdateBlog : handleAddBlog}
							className='save-btn'>
							{isEditMode ? "Update" : "Submit"}
						</button>
					</div>
				</Modal>
			</div>
		</DashboardLayout>
	);
}
