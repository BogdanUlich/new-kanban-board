import classNames from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'

interface FormProps {
    btn: string
    handleClick: (email: string, pass: string) => void
}

const Form: FC<FormProps> = ({ btn, handleClick }) => {
    const [email, setEmail] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [emailDirty, setEmailDirty] = useState<boolean>(false)
    const [passDirty, setPassDirty] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<string>('Поле не может быть пустым')
    const [passError, setPassError] = useState<string>('Поле не может быть пустым')
    const [formValid, setformValid] = useState<boolean>(false)

    const emailRef = useRef<HTMLInputElement>(null)
    const passRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (emailError || passError) {
            setformValid(false)
        } else {
            setformValid(true)
        }
    }, [emailError, passError])

    const onBlurHandler = (name: string | undefined) => {
        if (name) {
            switch (name) {
                case 'email':
                    setEmailDirty(true)
                    if (!email) {
                        setEmailError('Поле не может быть пустым')
                    }
                    break
                case 'password':
                    setPassDirty(true)
                    if (!pass) {
                        setPassError('Поле не может быть пустым')
                    }
                    break
            }
        }
    }

    const emailHandler = (email: string | undefined) => {
        if (email !== undefined) {
            setEmail(email)
            const re =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (!re.test(String(email).toLowerCase())) {
                setEmailError('Некорректный формат')
            } else {
                setEmailError('')
            }
        }
    }

    const passhandler = (password: string | undefined) => {
        if (password !== undefined) {
            setPass(password)
            if (password.length < 6) {
                setPassError('Не меньше 6 символов')
            } else {
                setPassError('')
            }
        }
    }

    const onSubmit = () => {
        if (!emailError && !passError) {
            handleClick(email, pass)
        }
    }

    return (
        <form className="form column">
            <label className="form__label">
                <span className="form__label-error">{emailDirty && emailError}</span>
                <input
                    type="email"
                    name="email"
                    className={classNames('form__input', emailDirty && emailError ? 'error' : '')}
                    onBlur={() => onBlurHandler(emailRef.current?.name)}
                    onChange={() => emailHandler(emailRef.current?.value)}
                    value={email}
                    placeholder="Введите ваш e-mail"
                    ref={emailRef}
                />
            </label>

            <label className="form__label">
                <span className="form__label-error">{passDirty && passError}</span>
                <input
                    type="password"
                    name="password"
                    className={classNames('form__input', passDirty && passError ? 'error' : '')}
                    onBlur={() => onBlurHandler(passRef.current?.name)}
                    onChange={() => passhandler(passRef.current?.value)}
                    value={pass}
                    placeholder="Введите пароль"
                    ref={passRef}
                />
            </label>

            <button className={classNames('form__btn', formValid ? 's' : 'disabled')} type="button" onClick={onSubmit}>
                {btn}
            </button>
        </form>
    )
}

export default Form
