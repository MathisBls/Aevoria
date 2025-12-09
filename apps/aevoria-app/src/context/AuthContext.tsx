import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, AuthContextType } from '../types/user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('useroxm');

      if (token) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            const userData = data.user;

            if (userData.id && !userData.id_user) {
              const mappedUser: User = {
                ...userData,
                id_user: userData.id,
              };
              setUser(mappedUser);
              localStorage.setItem('useroxm', JSON.stringify(mappedUser));
            } else {
              setUser(userData);
              localStorage.setItem('useroxm', JSON.stringify(userData));
            }
          } else if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('useroxm');
            setUser(null);
          } else if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.id && !parsedUser.id_user) {
              const mappedUser: User = {
                ...parsedUser,
                id_user: parsedUser.id,
              };
              setUser(mappedUser);
            } else {
              setUser(parsedUser);
            }
          }
        } catch (error) {
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.id && !parsedUser.id_user) {
              const mappedUser: User = {
                ...parsedUser,
                id_user: parsedUser.id,
              };
              setUser(mappedUser);
            } else {
              setUser(parsedUser);
            }
          }
        }
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const login = ({ user, token }: { user: any; token: string }) => {
    const mappedUser: User = {
      ...user,
      id_user: user.id,
    };

    localStorage.setItem('token', token);
    localStorage.setItem('useroxm', JSON.stringify(mappedUser));
    setUser(mappedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('useroxm');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};