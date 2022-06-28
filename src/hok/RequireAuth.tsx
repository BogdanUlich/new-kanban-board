import { getAuth } from 'firebase/auth'
import { FC, ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import Loader from '../components/Loader'

type RequireAuthProps = {
    children: ReactElement
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
    const location = useLocation()
    const auth = getAuth()

    const [user, loading] = useAuthState(auth)

    if (loading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return children
}

export default RequireAuth
