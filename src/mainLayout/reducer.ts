import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchDataList } from "./actions";

interface data {
    end_year: string;
    intensity: string;
    sector: string;
    topic: string;
    insight: string;
    url: string;
    region: string;
    start_year: string;
    impact: string;
    added: string;
    published: string;
    country: string;
    relevance: string;
    pestle: string;
    source: string;
    title: string;
    likelihood: string;
    id: string;
}

interface DataState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    data: data[];
}

export interface dataListState {
    List: DataState;
}

const initialState: dataListState = {
    List: {
        status: 'idle',
        error: null,
        data: []
    },
};

const listSlice = createSlice({
    name: 'List',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataList.pending, (state) => {
                state.List.status = 'loading';
                state.List.error = null;
                state.List.data = [];
            })
            .addCase(fetchDataList.fulfilled, (state, action: PayloadAction<data[]>) => {
                state.List.status = 'succeeded';
                state.List.data = action.payload;
                state.List.error = null;
            })
            .addCase(fetchDataList.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.List.status = 'failed';
                state.List.data = []
                state.List.error = action.payload || 'Unknown error';
            });
    },
});

export default listSlice.reducer;
