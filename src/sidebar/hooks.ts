import { useCallback, useEffect } from "react";
import { useAppSelector, useAppDispatch, RootState } from "../store";
import {setTopic, setPestle, setStartYear, setSector} from "../mainLayout/filterReducer";

export const useFilterList = () => {

    const dispatch = useAppDispatch()

    const filterOptions = useAppSelector((state: RootState) => state.filterOptions.filterList.data);
    
    const handleSelect = useCallback((filter: string, value: string) => {

        console.log("handleSelect", filter, value);

        if(filter === "topic"){
           dispatch(setTopic(value));
        }

        if(filter === "pestle"){
            dispatch(setPestle(value));
        }

        if(filter === "start_year"){
            dispatch(setStartYear(value));
        }

        if(filter === "sector"){
            dispatch(setSector(value));
        }
    },[])

    return{
        filterOptions,
        handleSelect
    }
}