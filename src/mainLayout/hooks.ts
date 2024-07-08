import { useEffect } from "react";

import {fetchDataList} from "./actions"
import { useAppDispatch, useAppSelector, RootState } from "../store";


export const useDataList = () => {
    const dispatch = useAppDispatch()
    const list = useAppSelector((state) => state.listSlice.List.data);
    const selectedFilterOption = useAppSelector((state) => state.filterValues.filter.selectData)
    console.log("selectedFilterOption", selectedFilterOption)
    const params = {
        params: {
            topic: "car"
        }
    };
    useEffect(()=>{
     dispatch(fetchDataList(params))
    },[])

    return{
        list
    }
}
