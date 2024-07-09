import { createAsyncThunk } from "@reduxjs/toolkit";

import instance from "../api/axios";

export const fetchDataList = createAsyncThunk<any, {params: object}, { rejectValue: string }>(
    'DataList',
    async ({params}, { rejectWithValue }) => {
        try {
            const response = await instance.get("country", {params});
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch product list');
        }
    }
);