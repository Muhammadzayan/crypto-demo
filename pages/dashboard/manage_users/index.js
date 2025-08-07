import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { FiTrash2, FiEdit, FiEye, FiSearch } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns'; // install this if not yet: npm install date-fns

Modal.setAppElement('#__next');

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 5;

  const handleToggleAccountStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    const res = await fetch('/api/admin/users/status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });

    const data = await res.json();
    if (data.success) {
      const statusText = newStatus === 1 ? 'activated' : 'suspended';
      toast.success(`This user account has been ${statusText}.`);
      fetchUsers(); // Re-fetch updated user list
    } else {
      toast.error(data.message || 'Failed to update account status');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users'); // adjust endpoint if needed
    const data = await res.json();
    setUsers(data || []);
  };

  const handleDeleteUser = async (id) => {
    const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      toast.success('User deleted!');
      fetchUsers();
    } else {
      toast.error(data.message || 'Failed to delete user');
    }
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const filteredUsers = users.filter((user) =>
    `${user.full_name} ${user.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <DashboardLayout>
      <div className="category-container">

      <div className="category-header">
        <h2>Manage Users</h2>
        <div className="search-input-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

        <table className="category-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>#</th>
              <th style={{ textAlign: 'left' }}>Name</th>
              <th style={{ textAlign: 'left' }}>Email</th>
              <th style={{ textAlign: 'left' }}>Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user.id} style={{ textAlign: 'center' }}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td style={{ textAlign: 'left' }}>{user.full_name}</td>
                <td style={{ textAlign: 'left' }}>{user.email}</td>
                <td style={{ textAlign: 'left' }}>
                  <label className="switch" style={{ marginRight: '10px' }}>
                    <input
                      type="checkbox"
                      checked={user.active === 1}
                      onChange={() => handleToggleAccountStatus(user.id, user.active)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <button
                    className="btn-secondary"
                    onClick={() => openUserModal(user)}
                    style={{ marginRight: '10px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                  >
                    <FiEye />
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => handleDeleteUser(user.id)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="User Details"
        overlayClassName="modal-overlay"
        className="modal-content modal-large"
        closeTimeoutMS={300}
      >
        {selectedUser && (
          <>
            <div className="modal-title-wrapper">
              {selectedUser.avatar && (
                <img
                  src={selectedUser.avatar}
                  alt="Avatar"
                  className="puser-avatar"
                />
              )}
              <h3 className="modal-title">
                {selectedUser.full_name}'s Profile
              </h3>
            </div>

            <div className="modal-user-info-grid">
              <div><strong>First Name:</strong> {selectedUser.first_name}</div>
              <div><strong>Last Name:</strong> {selectedUser.last_name}</div>
              <div><strong>Email:</strong> {selectedUser.email}</div>
              {selectedUser.phone && <div><strong>Phone:</strong> {selectedUser.phone}</div>}
              {selectedUser.country && <div><strong>Country:</strong> {selectedUser.country}</div>}
              {selectedUser.city && <div><strong>City:</strong> {selectedUser.city}</div>}
              <div><strong>Role:</strong> {selectedUser.role}</div>
              <div><strong>Account Status:</strong> {selectedUser.active === 1 ? '✅ Active' : '❌ Inactive'}</div>
              {/* <div><strong>Email Verified:</strong> {selectedUser.email_verified_at ? '✅ Yes' : '❌ No'}</div> */}
              <div><strong>Notify Email:</strong> {selectedUser.notify_email ? 'Yes' : 'No'}</div>
              <div><strong>Notify Price:</strong> {selectedUser.notify_price ? 'Yes' : 'No'}</div>
              <div><strong>Marketing Emails:</strong> {selectedUser.notify_marketing ? 'Yes' : 'No'}</div>
              {selectedUser.bio && <div><strong>Bio:</strong> {selectedUser.bio}</div>}
              {selectedUser.created_at && (
                <div>
                  <strong>Member Since:</strong> {formatDistanceToNow(new Date(selectedUser.created_at), { addSuffix: true })}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button onClick={() => setModalIsOpen(false)} className="btn-cancel">
                Close
              </button>
            </div>
          </>
        )}
      </Modal>

      </div>
    </DashboardLayout>
  );
}
