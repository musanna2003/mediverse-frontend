import {  } from 'react-router';
import useAuth from '../../Context/useAuth';
import LoadingPage from '../../pages/LoadingPage';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    // const location = useLocation();

    if (loading) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <LoadingPage />
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <p className="text-red-500 font-semibold text-xl">
                    Unauthorized: Admin access only.
                </p>
            </div>
        );
    }

    return children;
};

export default AdminRoute;
