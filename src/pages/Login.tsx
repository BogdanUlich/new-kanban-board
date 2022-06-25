import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const LoginPage: FC = () => {
    const navigate = useNavigate()

    const handleLogin = async (email: string, password: string) => {
        const auth = getAuth()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch {
            alert('Неверный e-mail или пароль')
        }
    }

    return (
        <div className="container">
            <div className="auth column">
                <h2 className="auth__title">Вход в учетную запись</h2>
                <Form btn="Вход" handleClick={handleLogin} />
                <div className="auth__block">
                    <div className="auth__text">Нет учетной записи?</div>
                    <Link to="/registration" className="auth__link">
                        Регистрация
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
