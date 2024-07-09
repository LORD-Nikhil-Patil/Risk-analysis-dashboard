import { useEffect } from "react";

import {fetchDataList} from "./actions"
import { useAppDispatch, useAppSelector, RootState } from "../store";

interface list {
    end_year: number;
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

export const useDataList = () => {
    const dispatch = useAppDispatch()
    const list:list[]  = useAppSelector((state) => state.listSlice.List.data);
    const selectedFilterOption = useAppSelector((state) => state.filterValues.filter.selectData);

    const filterNonEmptyValues = (obj: any) => {
        const filteredObj: any = {};
        Object.keys(obj).forEach(key => {
            if (obj[key] !== "") {
                filteredObj[key] = obj[key];
            }
        });
        return filteredObj;
    };
    
    const filteredObject = filterNonEmptyValues(selectedFilterOption);
    
    const params = {
        params: {
            ...filteredObject
        }
    };

    useEffect(()=>{
     dispatch(fetchDataList(params))
    },[])

    useEffect(()=>{
        dispatch(fetchDataList(params))
    }, [selectedFilterOption])

    return{
        list
    }
}
