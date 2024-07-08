import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import topBarSlice from "../top-bar/reducer";
import listSlice from "../mainLayout/reducer";
import filterSlice from "../mainLayout/filterReducer"

export const createStore = () => configureStore({
    reducer: {
        filterOptions: topBarSlice,
        listSlice: listSlice,
        filterValues: filterSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const store: any = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = typeof store;
