import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    skills: '',
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      alert('Error fetching users: ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const skills = formData.skills ? formData.skills.split(',').map(skill => skill.trim()) : [];
    const userData = { ...formData, skills };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('User created successfully!');
        fetchUsers();
        setFormData({ name: '', email: '', password: '', role: 'user', skills: '' });
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error creating user: ' + error.message);
    }
  };

  const handleUpdateAvailability = async (email, availability) => {
    try {
      const response = await fetch(`${API_URL}/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ availability }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Availability updated!');
        fetchUsers();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error updating availability: ' + error.message);
    }
  };

  const handleDeleteUser = async (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`${API_URL}/${email}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
          alert('User deleted successfully!');
          fetchUsers();
        } else {
          alert('Error: ' + data.error);
        }
      } catch (error) {
        alert('Error deleting user: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      <h1>Smart Event Manager</h1>

      {/* Create User Form */}
      <h2>Create User</h2>
      <form onSubmit={handleCreateUser} className="create-user-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <select name="role" value={formData.role} onChange={handleInputChange} required>
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma-separated, required for managers)"
          value={formData.skills}
          onChange={handleInputChange}
        />
        <button type="submit">Create User</button>
      </form>

      {/* User List */}
      <h2>Users</h2>
      <div className="user-list">
        {users.map(user => (
          <div key={user.email} className="user-card">
            <div>
              <strong>{user.name}</strong> ({user.email})<br />
              Role: {user.role}<br />
              Skills: {user.skills.join(', ') || 'None'}<br />
              Availability: 
              <input
                type="checkbox"
                checked={user.availability}
                onChange={(e) => handleUpdateAvailability(user.email, e.target.checked)}
              />
            </div>
            <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;