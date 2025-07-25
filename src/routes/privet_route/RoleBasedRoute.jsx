import { Navigate, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import useAuth from '../../Context/useAuth';
import axios from 'axios';
import LoadingPage from '../../pages/LoadingPage';
import axiosSecure from '../../Utilities/axiosSecure.js'; // path as needed

const RoleBasedRoute = ({ children, allowedRoles = [], redirectTo = '/login', showWarning = false }) => {
    const { user: firebaseUser, loading } = useAuth(); // From Firebase
    const location = useLocation();

    const [dbUser, setDbUser] = useState(null);
    const [dbLoading, setDbLoading] = useState(true);
    const [dbError, setDbError] = useState(null);

    useEffect(() => {
        const fetchDbUser = async () => {
            if (!firebaseUser?.email) return;

            setDbLoading(true);
            setDbError(null);

            try {
                const res = await axiosSecure.get('http://localhost:3000/users/profile', {
                    params: { email: firebaseUser.email },
                });
                setDbUser(res.data);
            } catch (err) {
                console.error(err);
                setDbError('Failed to load user role');
            } finally {
                setDbLoading(false);
            }
        };

        fetchDbUser();
    }, [firebaseUser?.email]);

    if (loading || dbLoading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <LoadingPage />
            </div>
        );
    }

    if (!firebaseUser) {
        return <Navigate to={redirectTo} state={{ from: location.pathname }} />;
    }

    if (!dbUser?.role) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <p className="text-red-500 font-semibold text-xl">
                    Unauthorized: No role assigned.
                </p>
            </div>
        );
    }

    if (!allowedRoles.includes(dbUser.role)) {
        if (showWarning) {
            return (
                <div className="w-full h-screen flex justify-center items-center">
                    <p className="text-red-500 font-semibold text-xl">
                        Unauthorized: Only {allowedRoles.join(' / ')} allowed.
                    </p>
                </div>
            );
        } else {
            return <Navigate to={redirectTo} state={{ from: location.pathname }} />;
        }
    }

    return children;
};

export default RoleBasedRoute;