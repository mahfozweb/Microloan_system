import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating checking for a persisted session
        const storedUser = localStorage.getItem('loanlink_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse stored user', error);
                localStorage.removeItem('loanlink_user');
            }
        }
        setLoading(false);
    }, []);

    const register = async (email, password, userData) => {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const newUser = {
                uid: 'mock-user-id-' + Date.now(),
                email,
                name: userData.name || 'New User',
                photoURL: userData.photoURL || 'https://via.placeholder.com/150',
                role: userData.role || 'borrower',
                emailVerified: true,
            };

            setUser(newUser);
            localStorage.setItem('loanlink_user', JSON.stringify(newUser));
            localStorage.setItem('token', 'mock-jwt-token');

            toast.success('Registration successful! (Mock)');
            setLoading(false);
            return { user: newUser };
        } catch (error) {
            setLoading(false);
            toast.error('Registration failed');
            throw error;
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            // accepting any password for mock
            let role = 'borrower';
            if (email.includes('manager')) role = 'manager';
            if (email.includes('admin')) role = 'admin';

            const mockUser = {
                uid: 'mock-user-id-123',
                email,
                name: role.charAt(0).toUpperCase() + role.slice(1) + ' User',
                photoURL: 'https://via.placeholder.com/150',
                role: role,
                emailVerified: true,
            };

            setUser(mockUser);
            localStorage.setItem('loanlink_user', JSON.stringify(mockUser));
            localStorage.setItem('token', 'mock-jwt-token');

            toast.success('Login successful! (Mock)');
            setLoading(false);
            return { user: mockUser };
        } catch (error) {
            setLoading(false);
            toast.error('Login failed');
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        return login('google-user@example.com', 'password');
    };

    const loginWithGithub = async () => {
        return login('github-user@example.com', 'password');
    };

    const logout = async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setUser(null);
        localStorage.removeItem('loanlink_user');
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
    };

    const value = {
        user,
        loading,
        register,
        login,
        loginWithGoogle,
        loginWithGithub,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
