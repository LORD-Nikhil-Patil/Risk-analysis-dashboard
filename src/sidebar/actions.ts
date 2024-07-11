import { createAsyncThunk } from "@reduxjs/toolkit";

import instance from "../api/axios";

export const fetchFilterList = createAsyncThunk<any, {}, { rejectValue: string }>(
    'filterList',
    async ({}, { rejectWithValue }) => {
        try {
            const response = await instance.get("country/filterlist");
            return response.data;
        } catch (error) {
            return rejectWithValue('Failed to fetch product list');
        }
    }
);