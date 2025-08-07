import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { FiPlus, FiTrash2, FiEdit} from 'react-icons/fi';

Modal.setAppElement('#__next');

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const itemsPerPage = 5;

  const openEditModal = (category) => {
    setCategoryName(category.name);
    setEditCategoryId(category.id);
    setEditMode(true);
    setModalIsOpen(true);
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch('/api/admin/categories/category');
    const data = await res.json();
    setCategories(data || []);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const res = await fetch('/api/admin/categories/status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });

    const data = await res.json();
    if (data.success) {
      fetchCategories();
      toast.success('Status updated');
    } else {
      toast.error(data.message || 'Failed to update status');
    }
  };

  const handleSaveCategory = async () => {
    if (!categoryName.trim()) return;

    const method = editMode ? 'PUT' : 'POST';
    const res = await fetch('/api/admin/categories/category', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editCategoryId, name: categoryName }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success(`Category ${editMode ? 'updated' : 'added'}!`);
      fetchCategories();
      setModalIsOpen(false);
      setCategoryName('');
      setEditCategoryId(null);
      setEditMode(false);
    } else {
      toast.error(data.message || 'Operation failed');
    }
  };

  const handleDeleteCategory = async (id) => {
    const res = await fetch(`/api/admin/categories/category?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      toast.success('Category deleted!');
      fetchCategories();
    } else {
      toast.error(data.message || 'Failed to delete category');
    }
  };

  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (

    <DashboardLayout>
      <div className="category-container">
        <div className="category-header">
          <h2>Manage Categories</h2>
          <button className="save-btn btn-sm" onClick={() => setModalIsOpen(true)}>
            <FiPlus style={{ marginRight: '5px' }} />
            Add New
          </button>
        </div>


        <table className="category-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>#</th>
              <th style={{ textAlign: 'left' }}>Name</th>
              <th style={{ textAlign: 'center' }}>Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          
          <tbody>
            {paginatedCategories.map((cat, index) => (
              <tr key={cat.id} style={{ textAlign: 'center' }}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td  style={{ textAlign: 'left' }}>{cat.name}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={cat.status === 1}
                      onChange={() => handleToggleStatus(cat.id, cat.status)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <button
                    className="btn-secondary"
                    onClick={() => openEditModal(cat)}
                    style={{ marginRight: '10px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => handleDeleteCategory(cat.id)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Add Category"
          overlayClassName="modal-overlay"
          className="modal-content"
          closeTimeoutMS={300}
        >
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category name"
            className="form-input"
          />
          <div className="modal-actions">
            <button onClick={() => setModalIsOpen(false)} className="btn-cancel">
              Cancel
            </button>
            <button onClick={handleSaveCategory} className="btn-primary">
              {editMode ? 'Update' : 'Add New'}
            </button>

          </div>
        </Modal>
      </div>
    </DashboardLayout>


  );
}
