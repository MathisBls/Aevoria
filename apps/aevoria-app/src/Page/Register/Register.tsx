import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../../api/apiService';
import { useAuth } from '../../context/AuthContext';
import './Register.scss';

const Register: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!formData.username) newErrors.username = 'Username requis / Username required';
    if (!formData.email) newErrors.email = 'Email requis / Email required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email invalide / Invalid email format';
    if (!formData.password) newErrors.password = 'Mot de passe requis / Password required';
    else if (formData.password.length < 6) newErrors.password = '6 caractères min / Minimum 6 chars';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response: any = await apiService.post('/auth/register', formData);
      if (response && response.token && response.user) {
        login({ user: response.user, token: response.token });
        window.location.href = '/';
      } else {
        setErrors({ form: "Erreur d'inscription / Registration error" });
      }
    } catch (error: any) {
      setErrors({ form: error?.message || "Erreur inconnue / Unknown error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Créer un compte / Create account</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Pseudo / Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} className={errors.username ? 'error' : ''} autoComplete="username" />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={errors.email ? 'error' : ''} autoComplete="email" />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe / Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} className={errors.password ? 'error' : ''} autoComplete="new-password" />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          {errors.form && <span className="error-message form-error">{errors.form}</span>}
          <button type="submit" className="auth-button" disabled={loading}>{loading ? 'Création… / Creating…' : "S'inscrire / Register"}</button>
        </form>
        <p>Déjà un compte ? <Link to="/login">Connexion</Link></p>
      </div>
    </div>
  );
};

export default Register;
