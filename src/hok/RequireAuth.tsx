import { getAuth } from 'firebase/auth'
import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loader from '../components/Loader'

const RequireAuth: FC<any> = ({ children }) => {
    const location = useLocation()
    const auth = getAuth()

    const [user, loading, error] = useAuthState(auth)

    if (loading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return children
}

export default RequireAuth
