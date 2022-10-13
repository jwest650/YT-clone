import React from "react";

const Filter = ({ color }) => {
    return (
        <div
            className={
                !color ? "bg-transparent " : "bg-white top-[50px]  fixed w-full"
            }
        >
            <div className="p-3 space-x-4">
                <span className="bg-gray-200 text-sm  px-3 py-2 rounded-full">
                    All
                </span>
                <span className="bg-gray-200 text-sm px-3 py-2 rounded-full">
                    Related
                </span>
            </div>
        </div>
    );
};

export default Filter;
