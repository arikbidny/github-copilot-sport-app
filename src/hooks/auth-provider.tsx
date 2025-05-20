"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/lib/db';

interface AuthContextType {
  user: Partial<User> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name?: string) => Promise<boolean>;
  loginWithGithub: () => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Failed to login');
        return false;
      }
      
      // Save token and user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-token', data.token);
      }
      setUser(data.user);
      return true;
    } catch (err) {
      console.error('Login failed:', err);
      setError('An error occurred during login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Failed to sign up');
        return false;
      }
      
      // Save token and user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-token', data.token);
      }
      setUser(data.user);
      return true;
    } catch (err) {
      console.error('Signup failed:', err);
      setError('An error occurred during signup');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGithub = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: 'mock-code' })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Failed to login with GitHub');
        return false;
      }
      
      // Save token and user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-token', data.token);
      }
      setUser(data.user);
      return true;
    } catch (err) {
      console.error('GitHub login failed:', err);
      setError('An error occurred during GitHub login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: 'mock-code' })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Failed to login with Google');
        return false;
      }
      
      // Save token and user data
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth-token', data.token);
      }
      setUser(data.user);
      return true;
    } catch (err) {
      console.error('Google login failed:', err);
      setError('An error occurred during Google login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-token');
    }
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    loginWithGithub,
    loginWithGoogle,
    logout,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}