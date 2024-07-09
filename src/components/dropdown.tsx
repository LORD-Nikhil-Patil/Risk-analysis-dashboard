import React from 'react';

interface DropdownSelectProps {
    placeholder: string;
    options: string[];
    handleSelect: (placeholder: string, option: string) => void;
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({options = [], handleSelect, placeholder = "" }) => {
    return (
        <form className="max-w-sm mx-auto min-w-28 mr-4">
            <label htmlFor="underline_select" className="sr-only">{placeholder}</label>
            <select
                id="underline_select"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                onChange={(e) => handleSelect(placeholder, e.target.value)}
            >
                <option value="" selected>{`Choose a ${placeholder}`}</option>
                {options.map((option: string) => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>
        </form>
    );
};
