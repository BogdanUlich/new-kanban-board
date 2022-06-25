import { configureStore } from '@reduxjs/toolkit'
import board from './slices/boardSlice'

export const store = configureStore({
  reducer: {
    board,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
