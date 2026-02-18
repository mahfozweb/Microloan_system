import { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { toast } from 'react-toastify';
import api from '../services/api';

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

    // Store pending registration data so onAuthStateChanged can use the correct role
    const pendingRegistration = useRef(null);

    const syncUserFromDB = async (currentUser) => {
        try {
            await api.post('/jwt', {
                email: currentUser.email,
                name: currentUser.displayName,
            });

            // Get user info from DB
            const response = await api.get(`/user/role/${currentUser.email}`);
            const dbUser = response.data;

            setUser({
                uid: currentUser.uid,
                email: currentUser.email,
                name: currentUser.displayName,
                photoURL: currentUser.photoURL,
                role: dbUser?.role || 'borrower',
                status: dbUser?.status || 'active'
            });
        } catch (error) {
            console.error("Auth sync error:", error);
            setUser(null);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // If there's a pending registration, save to DB first with correct role
                if (pendingRegistration.current) {
                    const { name, email, photoURL, role } = pendingRegistration.current;
                    pendingRegistration.current = null; // clear it

                    try {
                        // Save user to DB with the selected role
                        await api.post('/users', { name, email, photoURL, role });
                    } catch (err) {
                        console.error('Failed to save user to DB:', err);
                    }
                }

                await syncUserFromDB(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const register = async (email, password, userData) => {
        setLoading(true);
        try {
            // Store registration data BEFORE creating Firebase user
            // so onAuthStateChanged can save it with the correct role
            pendingRegistration.current = {
                name: userData.name,
                email: email,
                photoURL: userData.photoURL || '',
                role: userData.role || 'borrower',
            };

            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update Firebase profile
            await updateProfile(result.user, {
                displayName: userData.name,
                photoURL: userData.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=0284c7&color=fff`
            });

            toast.success('Registration successful!');
            return result;
        } catch (error) {
            pendingRegistration.current = null; // clear on error
            toast.error(error.response?.data?.message || error.message || 'Registration failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login successful!');
            return result;
        } catch (error) {
            toast.error(error.message || 'Login failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // For Google login, save user to DB as borrower if not already exists
            await api.post('/users', {
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                role: 'borrower'
            });

            toast.success('Google login successful!');
            return result;
        } catch (error) {
            toast.error(error.message || 'Google login failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            await api.post('/logout');
            toast.success('Logged out successfully');
        } catch (error) {
            toast.error('Logout failed');
            throw error;
        }
    };

    const value = {
        user,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
