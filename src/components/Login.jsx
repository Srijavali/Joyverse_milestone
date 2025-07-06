import React, { useState } from 'react';
import axios from 'axios'; // ✅ Temporarily use raw axios

function Login({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'therapist'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const trimmedData = {
    email: formData.email.trim(),
    password: formData.password.trim(),
    role: formData.role.trim()
  };

  console.log("🟡 handleSubmit called");
  console.log("🌍 API URL:", process.env.REACT_APP_API_URL);
  console.log("📦 Sending login:", trimmedData);

  try {
    const res = await axios.post('http://localhost:5000/api/users/login', trimmedData);
    const user = res.data;
    console.log("✅ Login success:", user);

    if (user.role === 'therapist') {
      onLoginSuccess(user);
    } else {
      setError('Access restricted to therapists.');
    }
  } catch (err) {
    console.error("❌ Login error:", err.response?.data || err.message);
    setError('Invalid credentials');
  }
};

  return (
    <div>
      <h2>Therapist Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="therapist">Therapist</option>
          <option value="child">Child</option>
        </select>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;