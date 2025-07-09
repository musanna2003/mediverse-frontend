import { Navigate, useLocation } from 'react-router';
import useAuth from '../../Context/useAuth';
import LoadingPage from '../../pages/LoadingPage';

const UserRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    
    if (loading){
        return <div className=" w-full h-screen flex justify-center items-center">
            <LoadingPage></LoadingPage>
        </div>
    }
    if (!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children
};

export default UserRoute;