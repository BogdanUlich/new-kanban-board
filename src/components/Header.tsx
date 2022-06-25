import { FC } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import exit from '../assets/img/icons/exit.svg'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

const Header: FC = () => {
    const auth = getAuth()

    const [user, loading, error] = useAuthState(auth)

    const onClickLogout = () => {
        auth.signOut()
    }

    return (
        <div className="header">
            <div className="header__container container">
                <Link to="/" className="header__logo">
                    Kanban-board
                </Link>
                {user && (
                    <a href="/" className="header__logout">
                        <span onClick={onClickLogout}>Выйти</span>
                        <img src={exit} alt="" className="header__icon" />
                    </a>
                )}
            </div>
        </div>
    )
}

export default Header
