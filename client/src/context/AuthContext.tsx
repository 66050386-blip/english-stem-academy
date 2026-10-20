import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { api } from '../services/api';
import { subscribeToRealtimeUpdates } from '../utils/realtimeSync';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateUserStats: (xpEarned: number) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  refreshUser: async () => {},
  updateUserStats: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const userData = await api.auth.getMe();
      setUser(userData);
    } catch (err) {
      console.error('Failed to load user session:', err);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();

    // 1. Subscribe to instant realtime cross-tab and in-page events
    const unsubscribe = subscribeToRealtimeUpdates((msg) => {
      fetchCurrentUser();
    });

    // 2. Auto-revalidate when user switches back to this tab/window
    const handleFocus = () => {
      fetchCurrentUser();
    };
    window.addEventListener('focus', handleFocus);
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        fetchCurrentUser();
      }
    });

    return () => {
      unsubscribe();
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await api.auth.login({ email, password: pass });
    localStorage.setItem('token', res.token);
    setUser(res.user);
  };

  const register = async (userData: any) => {
    const res = await api.auth.register(userData);
    localStorage.setItem('token', res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const refreshUser = async () => {
    await fetchCurrentUser();
  };

  const updateUserStats = (xpEarned: number) => {
    if (!user || !user.statistics) return;
    const nextXP = user.statistics.xp + xpEarned;
    const nextLevel = Math.floor(nextXP / 100) + 1;
    setUser({
      ...user,
      statistics: {
        ...user.statistics,
        xp: nextXP,
        level: nextLevel,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
        updateUserStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
