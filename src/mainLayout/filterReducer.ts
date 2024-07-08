import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterObject {
    country: string;
    region: string;
    year: string;
    topic: string;
    pestle: string;
    start_year: string;
    sector: string;
}

interface FilterState {
    selectData: Partial<FilterObject>;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface FilterObjectState {
    filter: FilterState;
}

const initialState: FilterObjectState = {
    filter: {
        selectData: {
            country: '',
            region: '',
            year: '',
            topic: '',
            pestle: '',
            start_year: '',
            sector: '',
        },
        status: 'idle',
        error: null
    }
};

const filterSlice = createSlice({
    name: 'filterValues',
    initialState,
    reducers: {
        setCountry(state, action: PayloadAction<string>) {
            state.filter.selectData.country = action.payload;
        },
        setRegion(state, action: PayloadAction<string>) {
            state.filter.selectData.region = action.payload;
        },
        setYear(state, action: PayloadAction<string>) {
            state.filter.selectData.year = action.payload;
        },
        setTopic(state, action: PayloadAction<string>) {
            state.filter.selectData.topic = action.payload;
        },
        setPestle(state, action: PayloadAction<string>) {
            state.filter.selectData.pestle = action.payload;
        },
        setStartYear(state, action: PayloadAction<string>) {
            state.filter.selectData.start_year = action.payload;
        },
        setSector(state, action: PayloadAction<string>) {
            state.filter.selectData.sector = action.payload;
        },
        setData(state, action: PayloadAction<Partial<FilterObject>>) {
            state.filter.selectData = action.payload;
        },
    },
});

export const {
    setCountry,
    setRegion,
    setYear,
    setTopic,
    setPestle,
    setStartYear,
    setSector,
    setData,
} = filterSlice.actions;

export default filterSlice.reducer;
