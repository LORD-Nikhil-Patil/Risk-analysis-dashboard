import React from 'react';

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

type TableProps = {
  data: ListItem[];
};

export const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <section className="container px-2 mx-auto block max-h-50 max-w-full overflow-x-scroll">
      <div className="flex flex-col mt-6">
        <div className="sm:-mx-6">
          <div className="inline-block align-middle md:px-3 lg:px-3">
            <div className="border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <div className="overflow-y-auto" style={{ maxHeight: "50vh" }}>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-3 focus:outline-none" aria-label="Sort by Topic">
                          <span>Topic</span>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Insight
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Region
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Country
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Source
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {data.map((res) => (
                      <tr key={res.id}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white">
                              {res.topic}
                            </h2>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap max-w-72 overflow-x-scroll">
                          <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                            {res.insight}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4 className="text-gray-700 dark:text-gray-200">
                              {res.region}
                            </h4>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="text-gray-700 dark:text-gray-200">
                            {res.country}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap max-w-72 overflow-x-scroll">
                          <div className="text-gray-700 dark:text-gray-200">
                            {res.title}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="text-gray-700 dark:text-gray-200">
                            {res.source}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
