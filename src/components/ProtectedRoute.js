import {useAuthState} from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

import {auth} from '../config/firebase';

export default function ProtectedRoute({ children, loginOnly }) {
    const [user] = useAuthState(auth);
    if(!user && loginOnly) {
        return <Navigate to="/login" />
    }

    if(user && !loginOnly) {
        return <Navigate to="/browse" />
    }

    return children
}