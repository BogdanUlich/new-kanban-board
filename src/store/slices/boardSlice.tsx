import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { doc, getDoc } from 'firebase/firestore'
import { RootState } from '..'
import {
    BoardSliceState,
    DocSnapType,
    ListAndTaskId,
    ListType,
    SetListTitleAction,
    SetTaskTextAction,
    TaskType,
} from '../../types'
import db from '../../firebase'

const initialState: BoardSliceState = {
    boardLists: [],
    currentDragValues: {
        listId: null,
        taskId: null,
    },
    listCounter: 0,
    taskCounter: 0,
    loadingStatus: 'pending',
}

export const fetchData = createAsyncThunk<DocSnapType, string | undefined>('board/fetchData', async (userId) => {
    const docRef = doc(db, 'boardData', `${userId}`)
    const docSnap = await (await getDoc(docRef)).data()

    return docSnap as DocSnapType
})

const findList = (state: BoardSliceState, id: number | null) => {
    if (id !== null) {
        return state.boardLists.find((obj: ListType) => obj.id === id)
    }
}

const findListindex = (state: BoardSliceState, id: number) => {
    return state.boardLists.findIndex((obj: ListType) => obj.id === id)
}

const findTask = (state: BoardSliceState, listId: number | null, taskId: number | null) => {
    if (taskId && listId) {
        const list = state.boardLists.find((obj: ListType) => obj.id === listId)
        if (list) {
            return list.tasks.find((obj) => obj.id === taskId)
        }
    }
}

const findTaskIndex = (list: ListType | undefined, taskId: number | null) => {
    if (list && taskId !== null) {
        return list.tasks.findIndex((obj: TaskType) => obj.id === taskId)
    }
}

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        addNewList: (state) => {
            state.listCounter += 1

            state.boardLists.unshift({ id: state.listCounter, title: '', tasks: [] })
        },
        setListTitle: (state, action: PayloadAction<SetListTitleAction>) => {
            const list = findList(state, action.payload.id)

            if (list) {
                list.title = action.payload.title
            }
        },
        deleteList: (state, action: PayloadAction<number>) => {
            const listIndex = findListindex(state, action.payload)

            if (listIndex !== -1) {
                state.boardLists.splice(listIndex, 1)
            }
        },
        addNewtask: (state, action: PayloadAction<number>) => {
            const list = findList(state, action.payload)

            if (list) {
                state.taskCounter += 1
                list.tasks.push({ id: state.taskCounter, text: '' })
            }
        },
        setTaskText: (state, action: PayloadAction<SetTaskTextAction>) => {
            const task = findTask(state, action.payload.listId, action.payload.taskId)

            if (task) {
                task.text = action.payload.taskText
            }
        },
        deleteTask: (state, action: PayloadAction<ListAndTaskId>) => {
            const list = findList(state, action.payload.listId)

            const taskIndex: number | undefined = findTaskIndex(list, action.payload.taskId)

            if (taskIndex !== undefined && taskIndex >= 0 && list) {
                list.tasks.splice(taskIndex, 1)
            }
        },
        setCurrentDragValues: (state, action: PayloadAction<ListAndTaskId>) => {
            state.currentDragValues = action.payload
        },
        changeTaskOrder: (state, action: PayloadAction<ListAndTaskId>) => {
            const currentList = findList(state, state.currentDragValues.listId)

            const currentTaskIndex = findTaskIndex(currentList, state.currentDragValues.taskId)

            const currentTask = findTask(state, state.currentDragValues.listId, state.currentDragValues.taskId)

            const dropList = findList(state, action.payload.listId)

            const dropTaskIndex = findTaskIndex(dropList, action.payload.taskId)

            if (currentList && currentTaskIndex !== undefined && currentTaskIndex >= 0) {
                if (currentTask?.id !== action.payload.taskId) {
                    currentList.tasks.splice(currentTaskIndex, 1)
                }
            }

            if (dropList && dropTaskIndex !== undefined && dropTaskIndex >= 0 && currentTask) {
                if (currentTask.id !== action.payload.taskId) {
                    dropList.tasks.splice(dropTaskIndex, 0, currentTask)
                }
            }
        },
        clearCurrentDragValues: (state) => {
            state.currentDragValues = {
                listId: null,
                taskId: null,
            }
        },
        addtaskToList: (state, action: PayloadAction<number>) => {
            const list = findList(state, action.payload)

            const currentList = findList(state, state.currentDragValues.listId)

            const currentTaskIndex = findTaskIndex(currentList, state.currentDragValues.taskId)

            const currentTask = findTask(state, state.currentDragValues.listId, state.currentDragValues.taskId)

            if (list && currentTaskIndex !== undefined && currentTask) {
                currentList?.tasks.splice(currentTaskIndex, 1)
                list.tasks.push(currentTask)
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                if (action.payload) {
                    state.boardLists = action.payload.boardLists
                    state.listCounter = action.payload.listCounter
                    state.taskCounter = action.payload.taskCounter
                }
                state.loadingStatus = 'success'
            })
            .addCase(fetchData.pending, (state) => {
                state.loadingStatus = 'pending'
            })
    },
})

export const boardSelector = (state: RootState) => state.board

export const {
    setListTitle,
    setTaskText,
    addNewList,
    deleteList,
    addNewtask,
    deleteTask,
    setCurrentDragValues,
    changeTaskOrder,
    clearCurrentDragValues,
    addtaskToList,
} = boardSlice.actions

export default boardSlice.reducer
