import { FC } from 'react'
import fish from '../assets/img/gif/fish.gif'

const NotFound: FC = () => {
    return (
        <div className="not-found">
            <div className="not-found__container container">
                <img src={fish} alt="" className="not-found__gif" />
                <div className="not-found__title">404 Страница не найдена</div>
            </div>
        </div>
    )
}

export default NotFound
