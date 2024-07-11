import React, { useEffect } from "react";
import { useDataList } from "./hooks";
import  LineChart  from "../components/linegraph/index";
import {Table} from "../components/table"

const ChartSection = React.memo(({ title, data, yAxisLabel, lineColor }: any) => {
  return (
    <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{title}</h5>
      {data ? <LineChart data={data} yAxisLabel={yAxisLabel} lineColor={lineColor} /> : null}
    </div>
  );
});


const MainLayout = () => {
  const { chartData, list } = useDataList();

  return (
    <main className="relative  p-4 sm:ml-64 top-15">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4'>
        {chartData?.likelihoodData.length > 0 && <ChartSection title="Likelihood over the Years" data={chartData?.likelihoodData} yAxisLabel="Likelihood" lineColor="#ff7f0e" />}
        {chartData?.likelihoodData.length > 0 && <ChartSection title="Relevance over the Years" data={chartData?.relevanceData} yAxisLabel="Relevance" lineColor="#2ca02c" />}
         </div>
      </div>
      {chartData?.intensity.length > 0 && <ChartSection title="Intensity over the Years" data={chartData?.intensity} yAxisLabel="Intensity" lineColor="#1f77b4" />}
       <Table data={list}/>
    </main>
  );
}

export default React.memo(MainLayout);
