import React, { createContext, useContext, useState, useEffect } from 'react';
import GoTrue from 'gotrue-js';

interface User {
  id: string;
  email: string;
  user_metadata?: any;
  app_metadata?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<User>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize GoTrue client
  const auth = new GoTrue({
    APIUrl: `${window.location.origin}/.netlify/identity`,
    audience: '',
    setCookie: true
  });

  useEffect(() => {
    // Check for existing user session
    const initializeAuth = async () => {
      try {
        // Check if user is already logged in
        const currentUser = auth.currentUser();
        if (currentUser) {
          setUser({
            id: currentUser.id,
            email: currentUser.email || '',
            user_metadata: currentUser.user_metadata,
            app_metadata: currentUser.app_metadata
          });
        }
        
        // Check for recovery/confirmation tokens in URL
        const params = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');
        const recoveryToken = params.get('recovery_token');
        const inviteToken = params.get('invite_token');
        
        if (accessToken && refreshToken) {
          // User is logging in via email link
          try {
            const user = await auth.createUser({ access_token: accessToken, refresh_token: refreshToken });
            setUser({
              id: user.id,
              email: user.email || '',
              user_metadata: user.user_metadata,
              app_metadata: user.app_metadata
            });
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
          } catch (error) {
            console.error('Error creating user from tokens:', error);
          }
        } else if (recoveryToken) {
          // User is resetting password
          try {
            const user = await auth.recover(recoveryToken);
            setUser({
              id: user.id,
              email: user.email || '',
              user_metadata: user.user_metadata,
              app_metadata: user.app_metadata
            });
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
          } catch (error) {
            console.error('Error recovering user:', error);
          }
        } else if (inviteToken) {
          // User is accepting an invite
          try {
            const user = await auth.acceptInvite(inviteToken);
            setUser({
              id: user.id,
              email: user.email || '',
              user_metadata: user.user_metadata,
              app_metadata: user.app_metadata
            });
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
          } catch (error) {
            console.error('Error accepting invite:', error);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const response = await auth.login(email, password, true);
      const userData = {
        id: response.id,
        email: response.email || '',
        user_metadata: response.user_metadata,
        app_metadata: response.app_metadata
      };
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string): Promise<User> => {
    try {
      const response = await auth.signup(email, password);
      const userData = {
        id: response.id,
        email: response.email || '',
        user_metadata: response.user_metadata,
        app_metadata: response.app_metadata
      };
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const currentUser = auth.currentUser();
      if (currentUser) {
        await currentUser.logout();
      }
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      await auth.requestPasswordRecovery(email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  const updatePassword = async (password: string): Promise<User> => {
    try {
      const currentUser = auth.currentUser();
      if (!currentUser) {
        throw new Error('No user logged in');
      }
      
      const response = await currentUser.update({ password });
      const userData = {
        id: response.id,
        email: response.email || '',
        user_metadata: response.user_metadata,
        app_metadata: response.app_metadata
      };
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Password update error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
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