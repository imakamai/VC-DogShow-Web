import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';
import { User, LoginRequest, AuthResponse } from '../types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = sessionStorage.getItem('jwtToken');
            if (token) {
                try {
                    // Verify token and get user profile
                    const response = await api.get<User>('/User/my');
                    setUser(response.data);
                } catch (error) {
                    console.error('Failed to load user', error);
                    sessionStorage.removeItem('jwtToken');
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const login = async (data: LoginRequest) => {
        try {
            const response = await api.post<any>('/User/login', data);

            let token = response.data;
            // Handle potential JSON object wrap
            if (typeof token === 'object' && token !== null) {
                token = token.token || token.data || '';
            }

            if (!token || typeof token !== 'string') {
                throw new Error('Invalid token received from server');
            }

            sessionStorage.setItem('jwtToken', token);

            // Fetch user details immediately after login
            // We want this to throw if it fails, so the Login component knows login failed
            const userResponse = await api.get<User>('/User/my');
            setUser(userResponse.data);
        } catch (error) {
            console.error('Login process failed:', error);
            sessionStorage.removeItem('jwtToken');
            setUser(null);
            throw error;
        }
    };

    const logout = () => {
        sessionStorage.removeItem('jwtToken');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
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
