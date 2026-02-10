import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Film } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        // Mock registration
        console.log('Registering user:', formData);
        localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email }));
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <div className="auth-card">
                <div className="logo-section">
                    <Film size={48} color="#f84464" />
                    <h1>Create Account</h1>
                    <p>Join the community of movie lovers</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <div className="input-with-icon">
                            <User size={20} className="icon" />
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-with-icon">
                            <Mail size={20} className="icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="input-with-icon">
                            <Lock size={20} className="icon" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="input-with-icon">
                            <Lock size={20} className="icon" />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="input-field"
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-full">
                        Sign Up
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/" className="link">Login here</Link></p>
                </div>
            </div>

            <style>{`
                .login-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #1a1d29 0%, #24283b 100%);
                    padding: 1rem;
                }

                .auth-card {
                    background: var(--glass-bg);
                    backdrop-filter: blur(12px);
                    border: 1px solid var(--glass-border);
                    padding: 2.5rem;
                    border-radius: var(--radius-lg);
                    width: 100%;
                    max-width: 480px;
                    box-shadow: var(--shadow-lg);
                    animation: fadeIn 0.5s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .logo-section {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .logo-section h1 {
                    font-size: 1.75rem;
                    font-weight: 700;
                    margin: 1rem 0 0.5rem;
                    color: var(--text-primary);
                }

                .logo-section p {
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                }

                .form-group {
                    margin-bottom: 1.25rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                }

                .input-with-icon {
                    position: relative;
                }

                .input-with-icon .icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-secondary);
                    pointer-events: none;
                }

                .input-with-icon input {
                    padding-left: 40px;
                }

                .btn-full {
                    width: 100%;
                    margin-top: 1rem;
                    font-size: 1rem;
                    padding: 0.875rem;
                }

                .auth-footer {
                    margin-top: 2rem;
                    text-align: center;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }

                .link {
                    color: var(--accent-red);
                    font-weight: 600;
                    margin-left: 0.25rem;
                }

                .link:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default Register;
