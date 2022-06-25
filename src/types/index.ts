export interface userSliceState {
  id: null | string
}

export interface BoardSliceState {
  boardLists: ListType[]
  currentDragValues: CurrentDragValuesType
  listCounter: number
  taskCounter: number
  loadingStatus: 'pending' | 'success' | 'error'
}

export type ListType = {
  id: number
  title: string
  tasks: TaskType[]
}

export type TaskType = {
  id: number
  text: string
}

export type CurrentDragValuesType = {
  listId: number | null
  taskId: number | null
}

export type SetListTitleAction = {
  title: string
  id: number
}

export type SetTaskTextAction = {
  taskText: string
  listId: number
  taskId: number
}

export type ListAndTaskId = {
  taskId: number
  listId: number
}

export type DocSnapType = {
  boardLists: ListType[]
  listCounter: number
  taskCounter: number
}
