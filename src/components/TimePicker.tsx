import React from "react";

interface TimePickerProps {
    name: string;
    time: string;
    onTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }

const TimePicker: React.FC<TimePickerProps> = ({name, time, onTimeChange}) => {
  return (
    <>
      <form className="max-w-[8rem] mx-auto">
        {/* <label
          htmlFor="time"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select time:
        </label> */}
        <div className="relative">
          <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <input
            type="time"
            id="time"
            name={name}
            className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            min="09:00"
            value={time}
            onChange={onTimeChange}
            required
          />
        </div>
      </form>
    </>
  );
};

export default TimePicker;
