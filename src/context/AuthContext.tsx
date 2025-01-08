import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profile } from '../types';
import { storage } from '../lib/storage';
import { useToastContext } from './ToastContext';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { addToast } = useToastContext();

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const profile = await storage.signIn(email, password);
      setUser(profile);
      localStorage.setItem('currentUser', JSON.stringify(profile));
      addToast('Successfully signed in!', 'success');
      navigate('/my-stories');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      addToast('Failed to sign in', 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      const profile = await storage.signUp(email, password, name);
      setUser(profile);
      localStorage.setItem('currentUser', JSON.stringify(profile));
      addToast('Account created successfully!', 'success');
      navigate('/my-stories');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
      addToast('Failed to create account', 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    addToast('Successfully signed out', 'success');
    navigate('/');
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const updatedProfile = await storage.updateProfile(user.id, updates);
      setUser(updatedProfile);
      localStorage.setItem('currentUser', JSON.stringify(updatedProfile));
      addToast('Profile updated successfully!', 'success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      addToast('Failed to update profile', 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error,
        signIn, 
        signUp, 
        signOut,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};