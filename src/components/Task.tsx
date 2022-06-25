import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../hooks/reduxHooks'
import {
    changeTaskOrder,
    clearCurrentDragValues,
    deleteTask,
    setCurrentDragValues,
    setTaskText,
} from '../store/slices/boardSlice'
import trashIcon from '../assets/img/icons/trash.svg'
import debounce from 'lodash.debounce'

interface TaskProps {
    taskId: number
    text: string
    listId: number
}

const Task: FC<TaskProps> = ({ taskId, text, listId }) => {
    const taskTextRef = useRef<HTMLTextAreaElement>(null)
    const taskRef = useRef<HTMLDivElement>(null)

    const [tasktext, setTasktext] = useState('')

    const dispatch = useAppDispatch()

    useEffect(() => {
        setTasktext(text)
        return () => {
            dispatch(clearCurrentDragValues())
        }
    }, [])

    useEffect(() => {
        const textArea = taskTextRef.current
        textArea?.addEventListener('keyup', () => {
            let scrollHeight = textArea?.scrollHeight
            textArea.style.height = 'auto'
            textArea.style.height = `${scrollHeight}px`
        })
        textArea?.addEventListener('click', () => {
            let scrollHeight = textArea?.scrollHeight
            textArea.style.height = 'auto'
            textArea.style.height = `${scrollHeight}px`
        })
    }, [])

    const onTaskTextUpdate = useCallback(
        debounce(() => {
            if (taskTextRef.current) {
                dispatch(setTaskText({ taskText: taskTextRef.current.value, listId, taskId }))
            }
        }, 500),
        []
    )

    const onChangeTask = () => {
        if (taskTextRef.current) {
            setTasktext(taskTextRef.current.value)
            onTaskTextUpdate()
        }
    }

    const onRemoveTask = () => {
        dispatch(deleteTask({ taskId, listId }))
    }

    const onDragOver = (e: any) => {
        e.preventDefault()
        if (e.target.className == 'task__text' && taskRef.current && taskTextRef.current) {
            taskRef.current.style.background = '#dfdfdf'
            taskTextRef.current.style.background = '#dfdfdf'
        }
    }

    const onDragLeave = (e: any) => {
        if (taskRef.current && taskTextRef.current) {
            taskRef.current.style.background = '#ffffff'
            taskTextRef.current.style.background = '#ffffff'
        }
    }

    const onDragStart = () => {
        dispatch(setCurrentDragValues({ listId, taskId }))
    }

    const onDrop = (e: any) => {
        if (taskRef.current && taskTextRef.current) {
            taskRef.current.style.background = '#ffffff'
            taskTextRef.current.style.background = '#ffffff'
        }
        e.preventDefault()
        dispatch(changeTaskOrder({ listId, taskId }))
    }

    return (
        <div
            className="task"
            ref={taskRef}
            draggable={true}
            onDragOver={(e) => onDragOver(e)}
            onDragLeave={(e) => onDragLeave(e)}
            onDragStart={onDragStart}
            onDrop={(e) => onDrop(e)}
        >
            <textarea className="task__text" value={tasktext} ref={taskTextRef} onChange={onChangeTask} />
            <img src={trashIcon} alt="" className="task__icon" onClick={onRemoveTask} />
        </div>
    )
}

export default Task
