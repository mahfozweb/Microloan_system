import { createContext, useContext, useState, useEffect } from 'react';
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
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Determine role: Check localStorage first, otherwise fallback to email logic
                let role = localStorage.getItem(`loanlink_role_${currentUser.uid}`) || 'borrower';

                // Backup email logic for new logins if role isn't in storage
                if (!localStorage.getItem(`loanlink_role_${currentUser.uid}`)) {
                    if (currentUser.email?.includes('manager')) role = 'manager';
                    else if (currentUser.email?.includes('admin')) role = 'admin';
                }

                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    name: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    emailVerified: currentUser.emailVerified,
                    role: role
                });
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
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update profile with name and photo
            await updateProfile(result.user, {
                displayName: userData.name,
                photoURL: userData.photoURL || 'https://via.placeholder.com/150'
            });

            // Persist role in localStorage (Ideally this would be in Firestore)
            localStorage.setItem(`loanlink_role_${result.user.uid}`, userData.role || 'borrower');

            toast.success('Registration successful!');
            return result;
        } catch (error) {
            toast.error(error.message || 'Registration failed');
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
