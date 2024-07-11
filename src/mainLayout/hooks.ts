import { useEffect, useState, useMemo } from "react";
import { fetchDataList } from "./actions";
import { useAppDispatch, useAppSelector, RootState, createStore } from "../store";
import { createSelector } from 'reselect'

interface ListItem {
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

interface DataObject {
    x: number;
    y: number;
    source: string;
    insight: string;
}

export const useDataList = () => {
    const dispatch = useAppDispatch();
    
    const selectSelf = (state: RootState) => state;
    const listMemo = createSelector(selectSelf, (state) => state.listSlice.List.data);
    const filterMemo =  createSelector(selectSelf, (state) => state.filterValues.filter.selectData);
    const list: ListItem[] = useAppSelector(listMemo);
    const selectedFilterOption = useAppSelector(filterMemo);


    const [chartData, setChartData] = useState<{
        intensity: DataObject[];
        likelihoodData: DataObject[];
        relevanceData: DataObject[];
    }>({ intensity: [], likelihoodData: [], relevanceData: [] });

    const filterNonEmptyValues = (obj: any) => {
        const filteredObj: any = {};
        Object.keys(obj).forEach(key => {
            if (obj[key] !== "") {
                filteredObj[key] = obj[key];
            }
        });
        return filteredObj;
    };

    const filteredObject = useMemo(() => filterNonEmptyValues(selectedFilterOption), [selectedFilterOption]);
    console.log("filteredObject", filteredObject)
    useEffect(() => {
        const params = {
            params: {
                ...filteredObject
            }
        };
        dispatch(fetchDataList(params));
    }, [dispatch, filteredObject]);

    useEffect(() => {
        const generateData = () => {
            const filterData = (data: DataObject[]): DataObject[] => {
                let currentX: number | null = null;
                let maxY: number = -Infinity;
                const filteredArray: DataObject[] = [];
                data.forEach(obj => {
                    const { x, y } = obj;
                    if (x !== currentX) {
                        currentX = x;
                        maxY = y;
                        filteredArray.push(obj);
                    } else {
                        if (y > maxY) {
                            maxY = y;
                            filteredArray.pop();
                            filteredArray.push(obj);
                        }
                    }
                });
                return filteredArray;
            };

            const processData = (key: keyof ListItem) => list.map((item) => ({
                x: isNaN(Number(item.end_year)) ? 0 : Number(item.end_year),
                y: Number(item[key]),
                source: item.source,
                insight: item.insight
            })).sort((a, b) => a.x - b.x);

            setChartData({
                intensity: filterData(processData('intensity')),
                likelihoodData: filterData(processData('likelihood')),
                relevanceData: filterData(processData('relevance'))
            });
        };

        generateData();
    }, [list]);

    return {
        chartData,
        list
    };
};
