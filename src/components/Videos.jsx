import React from "react";
import { Suspense } from "react";
import useData from "../redux/Data";
import CardSkeleton from "./CardSkeleton";
import Filter from "./Filter";

import Video from "./Video";

const Videos = () => {
    const { data, isLoading } = useData();
    return (
        <div className="ml-60 bg-[#F9F9F9] h-screen w-full">
            <Filter color />
            <Suspense fallback="please reload">
                <div className="p-4 mt-24 grid grid-cols-4 gap-5">
                    {isLoading
                        ? Array(8)
                              .fill(0)
                              .map((x, i) => <CardSkeleton key={i} />)
                        : data?.map((data) => (
                              <Video key={data._id} data={data} />
                          ))}
                </div>
            </Suspense>
        </div>
    );
};

export default Videos;
