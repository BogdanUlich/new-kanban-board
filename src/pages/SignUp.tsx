import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../components/Form'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const SignUpPage: FC = () => {
    const navigate = useNavigate()

    const handleRegister = async (email: string, password: string) => {
        const auth = getAuth()
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch {
            alert('Пользователь уже существует')
        }
    }

    return (
        <div className="container">
            <div className="auth column">
                <h2 className="auth__title">Регистрация</h2>
                <Form btn="Регистрация" handleClick={handleRegister} />
                <div className="auth__block">
                    <div className="auth__text">У вас уже есть учетная запись?</div>
                    <Link to="/login" className="auth__link">
                        Вход
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
