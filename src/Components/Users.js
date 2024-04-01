import React, { useState, useEffect } from 'react';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users?page=${currentPage}&search=${searchTerm}&domain=${domainFilter}&gender=${genderFilter}&availability=${availabilityFilter}`);
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
  }, [currentPage, searchTerm, domainFilter, genderFilter, availabilityFilter]);

  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDomainChange = (event) => {
    setDomainFilter(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGenderFilter(event.target.value);
  };

  const handleAvailabilityChange = (event) => {
    setAvailabilityFilter(event.target.value);
  };

  return (
    <div className="users-container">
      <h1>Users</h1>
      <div className="filters">
        <div className="filter">
          <label htmlFor="domain-filter">Domain:</label>
          <select id="domain-filter" value={domainFilter} onChange={handleDomainChange}>
            <option value="">All</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            {/* Add other domain options as needed */}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="gender-filter">Gender:</label>
          <select id="gender-filter" value={genderFilter} onChange={handleGenderChange}>
            <option value="">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            {/* Add other gender options as needed */}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="availability-filter">Availability:</label>
          <select id="availability-filter" value={availabilityFilter} onChange={handleAvailabilityChange}>
            <option value="">All</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
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
