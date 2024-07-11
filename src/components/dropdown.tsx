import React from 'react';

interface DropdownSelectProps {
    placeholder: string;
    options: string[];
    handleSelect: (placeholder: string, option: string) => void;
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({options = [], handleSelect, placeholder = "" }) => {
    return (
        <form className="max-w-sm mx-auto min-w-28 mr-4 ">
            <label htmlFor="underline_select" className="sr-only">{placeholder}</label>
            <select
                id="underline_select"
                className="block py-2.5 w-full text-sm text-gray-700 bg-white border-2 border-white rounded-md shadow focus:outline-none focus:border-blue-600"
                onChange={(e) => handleSelect(placeholder, e.target.value)}
            >
                <option value="" selected>{`Choose ${placeholder}`}</option>
                {options.map((option: string) => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>
        </form>
    );
};
