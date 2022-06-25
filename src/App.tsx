import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import RequireAuth from './hok/RequireAuth'
import Board from './pages/Board'
import LoginPage from './pages/Login'
import NotFound from './pages/NotFound'
import SignUpPage from './pages/SignUp'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <RequireAuth>
                            <Board />
                        </RequireAuth>
                    }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<SignUpPage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App
