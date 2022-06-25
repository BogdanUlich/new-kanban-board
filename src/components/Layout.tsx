import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout: FC = () => {
    return (
        <div className="wrapper">
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout
