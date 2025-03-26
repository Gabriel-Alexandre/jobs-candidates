import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isDevelopmentMode: boolean;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  setDevelopmentMode: (enabled: boolean) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isDevelopmentMode: true, // process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === 'true',
      role: 'candidate',
      setRole: (role) => set({ role }),
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({
          user: {
            id: '1',
            email,
            name: 'John Doe',
            role: 'candidate',
          },
          isAuthenticated: true,
        });
      },
      signup: async (email: string, password: string, name: string, role: UserRole) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({
          user: {
            id: '1',
            email,
            name,
            role,
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      resetPassword: async (email: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
      setDevelopmentMode: (enabled: boolean) => {
        set({ isDevelopmentMode: enabled });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);