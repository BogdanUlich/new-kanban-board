import { FC } from 'react'
import plus from '../assets/img/icons/plus.svg'

interface InitialBoardListProps {
    onAddNewList: () => void
}

const InitialBoardList: FC<InitialBoardListProps> = ({ onAddNewList }) => {
    return (
        <div className="board-list board-list_initial column">
            <div className="board-list__btn" onClick={onAddNewList}>
                <img src={plus} alt="" className="board-list__btn-icon" />
                <span>Добавить новый список</span>
            </div>
        </div>
    )
}

export default InitialBoardList
