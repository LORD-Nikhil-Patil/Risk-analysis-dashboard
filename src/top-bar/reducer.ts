import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFilterList } from "./actions";

interface DataState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    data: object;
}

export interface FilterListState {
    filterList: DataState;
}

const initialState: FilterListState = {
    filterList: {
        status: 'idle',
        error: null,
        data: {}
    }
};

const topBarSlice = createSlice({
    name: 'filterList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilterList.pending, (state) => {
                state.filterList.status = 'loading';
                state.filterList.error = null;
                state.filterList.data = {};
            })
            .addCase(fetchFilterList.fulfilled, (state, action: PayloadAction<object>) => {
                state.filterList.status = 'succeeded';
                state.filterList.data = action.payload;
                state.filterList.error = null;
            })
            .addCase(fetchFilterList.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.filterList.status = 'failed';
                state.filterList.data = {};
                state.filterList.error = action.payload || 'Unknown error';
            });
    },
});

export default topBarSlice.reducer;
