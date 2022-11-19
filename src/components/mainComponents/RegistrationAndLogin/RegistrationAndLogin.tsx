import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import './RegistrationAndLogin.scss'

type Props = {
    loginData: UserType
    setLoginData: (prevState: UserType) => void
}

type UserType = {
    email: string
    password: string
    hasAccount: boolean
    isAdmin: boolean
}

const RegistrationAndLogin = ({ loginData, setLoginData }: Props) => {
    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setLoginData((prevState: UserType) => ({
            ...prevState,
            email: e.target.value,
        }))
    }
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setLoginData((prevState: UserType) => ({
            ...prevState,
            password: e.target.value,
        }))
    }
    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const auth = getAuth()
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then(() => {
                if (
                    loginData.email === 'mazaxaka.tyt@gmail.com' &&
                    'juliiaderevianko@gmail.com'
                ) {
                    /* @ts-ignore */
                    setLoginData((prevState: UserType) => ({
                        ...prevState,
                        hasAccount: true,
                        isAdmin: true,
                    }))
                } else {
                    /* @ts-ignore */
                    setLoginData((prevState: UserType) => ({
                        ...prevState,
                        hasAccount: true,
                        isAdmin: false,
                    }))
                }
            })
            .catch(() => {
                alert(
                    'Такого користувача не існує, або неправильно вписані дані'
                )
            })
    }

    return (
        <div className="registration-and-login">
            <div className="login">
                <div className="registration-header">Войти</div>
                <form id="login-form" onSubmit={login}>
                    <div className="login">
                        <div className="grid-wrapper">
                            <input
                                className="login"
                                type="text"
                                id="login-email"
                                onChange={handleChangeLogin}
                                value={loginData.email}
                            />
                            <input
                                className="password"
                                type="password"
                                id="login-password"
                                onChange={handleChangePassword}
                                value={loginData.password}
                            />
                            <button type="submit" className="submit">
                                Войти
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegistrationAndLogin
