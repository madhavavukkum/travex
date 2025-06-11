import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  useEffect(() => {
    if (!isLogin) {
      setEmailValid(formData.email ? validateEmail(formData.email) : null);
      setPasswordValid(formData.password ? validatePassword(formData.password) : null);
    } else {
      setEmailValid(null);
      setPasswordValid(null);
    }
  }, [formData.email, formData.password, isLogin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isLogin && (!validateEmail(formData.email) || !validatePassword(formData.password))) {
      setError('Please provide a valid email and password.');
      return;
    }

    try {
      const url = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;
      const response = await axios.post(`http://localhost:5000${url}`, payload);
      
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => window.location.href = '/', 1000);
      } else {
        setSuccess('Registration successful! Please log in.');
        setIsLogin(true);
        setFormData({ username: '', email: '', password: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-page">
      <div className="background-container"></div>
      <div className="login-overlay"></div>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="glass-card">
              <div className="glass-content p-4 p-md-5">
                <h2 className="heading-text mb-4">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                
                <form className="login-form" onSubmit={handleSubmit}>
                  {!isLogin && (
                    <div className="form-group">
                      <div className="floating-input">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          placeholder="Username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="username"><FiUser className="input-icon" /> Username</label>
                        <span className="focus-border"></span>
                      </div>
                    </div>
                  )}

                  <div className="form-group">
                    <div className="floating-input">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="email"><FiMail className="input-icon" /> Email</label>
                      <span className="focus-border"></span>
                    </div>
                    {emailValid === true && <p className="validation-success">Valid email</p>}
                    {emailValid === false && <p className="validation-error">Invalid email format</p>}
                  </div>

                  <div className="form-group">
                    <div className="floating-input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="password"><FiLock className="input-icon" /> Password</label>
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                      <span className="focus-border"></span>
                    </div>
                    {!isLogin && passwordValid === true && <p className="validation-success">Strong password</p>}
                    {!isLogin && passwordValid === false && (
                      <p className="validation-error">Password must be 8+ characters with uppercase, lowercase, number, and special character</p>
                    )}
                  </div>

                  <div className="form-group">
                    <button type="submit" className="submit-btn">
                      <span>{isLogin ? 'Login' : 'Register'}</span>
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      className="toggle-btn"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;