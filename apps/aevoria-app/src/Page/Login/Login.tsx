import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { FaDiscord, FaGoogle, FaSteam, FaFacebook } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../api/apiService';
import { AEVCheckbox, AEVButton, AEVModal } from '@aevoria/ui';
import './Login.scss';

const EyeIcon = Eye as React.ComponentType<LucideProps>;
const EyeOffIcon = EyeOff as React.ComponentType<LucideProps>;

const Login: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { login } = useAuth();
  const t = (key: string) => key;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  const [showSessionTerminatedModal, setShowSessionTerminatedModal] = useState(false);

  useEffect(() => {
    const sessionTerminated = searchParams.get('sessionTerminated');
    if (sessionTerminated === 'true') {
      setShowSessionTerminatedModal(true);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const images = [
    "https://images.unsplash.com/flagged/photo-1560177776-295b9cd779de?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsImageTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsImageTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name as keyof typeof errors] || errors.form) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
        form: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.email) {
      newErrors.email = t('forms.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('forms.validation.emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('forms.validation.passwordRequired');
    } else if (formData.password.length < 6) {
      newErrors.password = t('forms.validation.passwordMinLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit called', formData);

    if (validateForm()) {
      console.log('Form validated, attempting login...');
      try {
        const response = await apiService.post('/auth/login', {
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe
        }) as any;

        console.log('Login successful', response);
        login({ user: response.user, token: response.token });
        window.location.href = '/';
      } catch (error: any) {
        console.error('Login error:', error);
        let errorMessage = t('errors.generic');
        
        try {
          if (error?.message) {
            try {
              const parsedError = JSON.parse(error.message);
              if (parsedError.message) {
                errorMessage = parsedError.message;
              } else {
                errorMessage = error.message;
              }
            } catch {
              const errorText = error.message.toLowerCase();
              if (errorText.includes('invalid credentials') || errorText.includes('credentials')) {
                errorMessage = t('errors.auth.invalidCredentials');
              } else if (errorText.includes('network') || errorText.includes('fetch')) {
                errorMessage = t('errors.network');
              } else {
                errorMessage = error.message;
              }
            }
          } else if (error?.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error?.response?.data?.error) {
            errorMessage = error.response.data.error;
          } else if (error?.message) {
            errorMessage = error.message;
          }
        } catch {
          errorMessage = t('errors.generic');
        }
        
        setErrors({ form: errorMessage });
      }
    }
  };

  return (
    <>
      <AEVModal
        isOpen={showSessionTerminatedModal}
        onClose={() => setShowSessionTerminatedModal(false)}
        variant="default"
      >
        <div className="session-terminated-modal">
          <div className="session-terminated-modal__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
            </svg>
          </div>
          <h2>{t('errors.auth.sessionTerminated')}</h2>
          <p>
            {t('errors.auth.sessionTerminatedDesc')}
          </p>
          <p>
            {t('errors.auth.sessionTerminatedSecurity')}
          </p>
          <div className="session-terminated-modal__actions">
            <AEVButton
              variant="primary"
              size="lg"
              onClick={() => setShowSessionTerminatedModal(false)}
            >
              {t('common.confirm')}
            </AEVButton>
          </div>
        </div>
      </AEVModal>
      <div className="auth-container">
      <div className="auth-layout">
        <div className="auth-left">
          <div className="auth-background">
            <div className="auth-particles">
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
              <div className="particle"></div>
            </div>
          </div>
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-logo">
                <img src="/oxymore.svg" alt="Oxymore" />
              </div>
              <h1>{t('auth.login.title')}</h1>
              <p>{t('auth.login.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">{t('forms.labels.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder={t('forms.placeholders.email')}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">{t('forms.labels.password')}</label>
                <div className="password-input-wrapper">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? 'error' : ''}
                    placeholder={t('forms.placeholders.password')}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              {errors.form && <span className="error-message form-error">{errors.form}</span>}

              <div className="form-options">
                <AEVCheckbox
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  name="rememberMe"
                  label={t('forms.labels.rememberMe')}
                  theme="purple"
                  size="large"
                />
                <Link to="/forgot-password" className="forgot-password">{t('forms.labels.forgotPassword')}</Link>
              </div>

              <AEVButton
                variant="primary"
                size="lg"
                className="auth-button"
                type="submit"
              >
                {t('auth.login.signIn')}
              </AEVButton>
            </form>

            <div className="auth-divider">
              <span>{t('auth.login.continueWith')}</span>
            </div>

            <div className="social-login">
              <button className="social-button discord">
                <FaDiscord />
                <span>Discord</span>
              </button>
              <button className="social-button google">
                <FaGoogle />
                <span>Google</span>
              </button>
              <button className="social-button steam">
                <FaSteam />
                <span>Steam</span>
              </button>
              <button className="social-button facebook">
                <FaFacebook />
                <span>Facebook</span>
              </button>
            </div>

            <div className="auth-footer">
              <p>{t('auth.login.noAccount')} <Link to="/register" className="auth-link">{t('auth.login.signUp')}</Link></p>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-visual">
            <div className="visual-content">
              <div className="visual-title">
              </div>
              <div className="visual-image">
                <div className="image-container">
                  <img
                    src={images[currentImageIndex]}
                    alt={t('common.loading')}
                    key={currentImageIndex}
                    className={isImageTransitioning ? 'transitioning' : ''}
                  />
                  <div className="image-overlay"></div>
                </div>
              </div>
            </div>
            <div className="visual-bg">
              <div className="bg-gradient"></div>
              <div className="bg-pattern"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;