import { DropdownSelect } from "../components/index";

import {useFilterList} from "./hooks";

const Sidebar = () => {
   const {filterOptions, handleSelect} = useFilterList()
    return (<div className="relative top-24"> 
        <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
           <span className="sr-only">Open sidebar</span>
           <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
           <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
           </svg>
        </button>
        
        <aside id="default-sidebar" className="fixed top-12 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
           <div className="h-full px-3 py-4 overflow-y-auto bg-gray-300 dark:bg-gray-800">
              <ul className="space-y-2 font-medium relative top-10">
                 <li className="flex flex-row">
                 <DropdownSelect options={filterOptions.topic} handleSelect={handleSelect} placeholder={"topic"} />
                 <DropdownSelect options={filterOptions.pestle} handleSelect={handleSelect} placeholder={"pestle"} />
                 </li>
                 <li className="flex flex-row">
                  <DropdownSelect options={filterOptions.start_year} handleSelect={handleSelect} placeholder={"start_year"} />
                 <DropdownSelect options={filterOptions.sector} handleSelect={handleSelect} placeholder={"sector"} />
                 </li>
              </ul>
           </div>
        </aside>
        </div>)
}

export default Sidebar;