import React, { useState, useEffect } from 'react';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users?page=${currentPage}&search=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const { users, totalPages } = await response.json();
        setUsers(users);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, [currentPage, searchTerm]);

  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="users-container">
      <h1>Users</h1>
      <div className="search-container">
  <input
    className="search-input"
    type="text"
    placeholder="Search by name..."
    value={searchTerm}
    onChange={handleSearchChange}
  />
  {/* You can add a search button here if needed */}
</div>

      <div className="user-cards">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="user-avatar" />
            <div className="user-details">
              <p><strong>ID:</strong> {user.id}</p>
              <p><strong>First Name:</strong> {user.first_name}</p>
              <p><strong>Last Name:</strong> {user.last_name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Domain:</strong> {user.domain}</p>
              <p><strong>Availability:</strong> {user.available ? 'Available' : 'Not Available'}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Users;
