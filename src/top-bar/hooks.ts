import { useCallback, useEffect } from "react";

import {fetchFilterList} from "./actions"
import { useAppDispatch, useAppSelector, RootState } from "../store";
import {setCountry, setRegion, setYear} from "../mainLayout/filterReducer";

export const useFilterList = () => {
    const dispatch = useAppDispatch()
    const filterOptions = useAppSelector((state: RootState) => state.filterOptions.filterList.data);
    
    const handleSelect = useCallback((filter: string, value: string) => {

        if(filter === "country"){
           dispatch(setCountry(value));
        }

        if(filter === "region"){
            dispatch(setRegion(value));
        }

        if(filter === "year"){
            dispatch(setYear(value));

        }
    },[])

    useEffect(()=>{
     dispatch(fetchFilterList({}))
    },[])

    return{
        filterOptions,

        handleSelect
    }
}