import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { TaskType } from '../types'
import Task from './Task'
import plus from '../assets/img/icons/plus.svg'
import times from '../assets/img/icons/delete.svg'
import { useAppDispatch } from '../hooks/reduxHooks'
import debounce from 'lodash.debounce'
import { addtaskToList, setListTitle } from '../store/slices/boardSlice'

interface BoardListProps {
    id: number
    title: string
    tasks: TaskType[]
    onDeleteList: (id: number) => void
    onAddTask: (id: number) => void
}

const BoardList: FC<BoardListProps> = ({ id, title, tasks, onDeleteList, onAddTask }) => {
    const dispatch = useAppDispatch()

    const [boardListTitle, setBoardListTitle] = useState<string>('')

    const listTitleRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setBoardListTitle(title)
    }, [])

    const onListTitleUpdate = useCallback(
        debounce(() => {
            if (listTitleRef.current) {
                dispatch(setListTitle({ title: listTitleRef.current?.value, id }))
            }
        }, 500),
        []
    )

    const onChangeListTitle = () => {
        if (listTitleRef.current) {
            setBoardListTitle(listTitleRef.current.value)
            onListTitleUpdate()
        }
    }

    const onDragOverList = (e: any) => {
        e.preventDefault()
    }
    const onDropList = (e: any) => {
        e.preventDefault()
        dispatch(addtaskToList(id))
    }

    if (!tasks) {
        return null
    }

    return (
        <div className="board-list column">
            <div className="board-list__header">
                <input
                    ref={listTitleRef}
                    type="text"
                    className="board-list__title"
                    placeholder="Название списка"
                    value={boardListTitle}
                    onChange={onChangeListTitle}
                />
                <img
                    src={times}
                    alt=""
                    className="board-list__header-icon"
                    onClick={() => {
                        onDeleteList(id)
                    }}
                />
            </div>

            <div className="board-list__container column">
                {tasks.map((obj) => (
                    <Task taskId={obj.id} text={obj.text} key={obj.id} listId={id} />
                ))}
            </div>

            <div
                className="board-list__footer"
                onClick={() => onAddTask(id)}
                onDrop={(e) => onDropList(e)}
                onDragOver={(e) => onDragOverList(e)}
            >
                <img src={plus} alt="" className="board-list__footer-icon" />
                <span>Добавить задачу</span>
            </div>
        </div>
    )
}

export default BoardList
