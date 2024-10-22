import React from "react";

interface searchInputProps {
  value: string;
  handleChange: any;
  handleSearch: () => void;
}

const SearchInput: React.FC<searchInputProps> = ({
  value,
  handleChange,
  handleSearch,
}) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:border-black focus:ring-0 focus:outline-none"
          placeholder="Search users..."
          value={value}
          onChange={handleChange}
          required
        />
        <button
          onClick={handleSearch}
          className="text-white absolute end-2.5 bottom-2.5 bg-gray-800 hover:bg-gray-900  font-medium rounded-lg text-sm px-4 py-2"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
