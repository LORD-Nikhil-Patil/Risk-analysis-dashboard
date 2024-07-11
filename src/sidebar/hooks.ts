import { useCallback, useEffect } from "react";
import { useAppSelector, useAppDispatch, RootState } from "../store";
import { setTopic, setPestle, setStartYear, setSector, setCountry, setRegion, setYear } from "../mainLayout/filterReducer";
import {fetchFilterList} from "./actions"


export const useFilterList = () => {

    const dispatch = useAppDispatch()

    const filterOptions = useAppSelector((state: RootState) => state.filterOptions.filterList.data);
    console.log("filterOptions", filterOptions);

    useEffect(()=>{
        dispatch(fetchFilterList({}))
       },[]) 
    const handleSelect = useCallback((filter: string, value: string) => {

        if (filter === "topic") {
            dispatch(setTopic(value));
        }

        if (filter === "pestle") {
            dispatch(setPestle(value));
        }

        if (filter === "start_year") {
            dispatch(setStartYear(value));
        }

        if (filter === "sector") {
            dispatch(setSector(value));
        }
        if (filter === "country") {
            dispatch(setCountry(value));
        }

        if (filter === "region") {
            dispatch(setRegion(value));
        }

        if (filter === "year") {
            dispatch(setYear(value));

        }
    }, [])

    return {
        filterOptions,
        handleSelect
    }
}