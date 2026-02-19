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

    const syncUserFromDB = async (currentUser, registrationRole = null) => {
        try {
            // Get JWT cookie from backend
            await api.post('/jwt', {
                email: currentUser.email,
                name: currentUser.displayName,
            });

            // Get user role/status from DB
            const response = await api.get(`/user/role/${currentUser.email}`);
            const dbUser = response.data;

            if (dbUser && dbUser.role) {
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    name: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    role: dbUser.role,
                    status: dbUser.status || 'active'
                });
            } else {
                // If user not in DB, fallback to registration role or borrower
                console.warn("User role not found in database for:", currentUser.email);
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    name: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    role: registrationRole || 'borrower',
                    status: 'active'
                });
            }
        } catch (error) {
            console.error("Auth sync error:", error.message);

            // If it's a 404, the user might just be new/not synced yet
            const isNotFoundError = error.response?.status === 404;

            if (!isNotFoundError) {
                toast.error("Connecting to server failed. Role-based features may be limited.");
            }

            setUser({
                uid: currentUser.uid,
                email: currentUser.email,
                name: currentUser.displayName,
                photoURL: currentUser.photoURL,
                role: registrationRole || 'borrower',
                status: 'active'
            });
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // If there's a pending registration, save to DB first with correct role
                let registrationRole = null;
                if (pendingRegistration.current) {
                    const { name, email, photoURL, role } = pendingRegistration.current;
                    registrationRole = role;
                    pendingRegistration.current = null; // clear it

                    try {
                        // Save user to DB with the selected role
                        await api.post('/users', { name, email, photoURL, role });
                    } catch (err) {
                        console.error('Failed to save user to DB:', err);
                    }
                }

                await syncUserFromDB(currentUser, registrationRole);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const register = async (email, password, userData) => {
        // Keep loading=true so PrivateRoute waits; onAuthStateChanged will set it false
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
            setLoading(false); // only set false on error; success path handled by onAuthStateChanged
            toast.error(error.response?.data?.message || error.message || 'Registration failed');
            throw error;
        }
        // NOTE: Do NOT call setLoading(false) in finally here.
        // onAuthStateChanged will call setLoading(false) after syncing the user.
    };

    const login = async (email, password) => {
        // Keep loading=true so PrivateRoute waits; onAuthStateChanged will set it false
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success('Login successful!');
            return result;
        } catch (error) {
            setLoading(false); // only set false on error
            toast.error(error.message || 'Login failed');
            throw error;
        }
        // NOTE: Do NOT call setLoading(false) in finally here.
        // onAuthStateChanged will call setLoading(false) after syncing the user.
    };

    const loginWithGoogle = async () => {
        // Keep loading=true; onAuthStateChanged will set it false
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // For Google login, save user to DB as borrower if not already exists
            try {
                await api.post('/users', {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    role: 'borrower'
                });
            } catch (dbErr) {
                console.error('Failed to save Google user to DB:', dbErr);
            }

            toast.success('Google login successful!');
            return result;
        } catch (error) {
            setLoading(false); // only on error
            toast.error(error.message || 'Google login failed');
            throw error;
        }
        // onAuthStateChanged will call setLoading(false) after syncing the user.
    };

    const logout = async () => {
        try {
            await signOut(auth);
            // Attempt backend logout, but don't block if it fails (e.g. server down)
            try {
                await api.post('/logout');
            } catch (backendError) {
                console.warn("Backend logout failed (likely network issue):", backendError.message);
            }
            toast.success('Logged out successfully');
        } catch (error) {
            console.error("Logout error:", error);
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
