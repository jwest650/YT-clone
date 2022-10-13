import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TrendsSkeleton = () => {
    return (
        <div className="flex space-x-2">
            <div className=" w-48">
                <Skeleton height={105} />
            </div>
            <div className="w-32 space-y-2 ">
                <div>
                    <Skeleton />
                </div>
                <div>
                    <Skeleton />
                </div>
                <div>
                    <Skeleton />
                </div>
            </div>
        </div>
    );
};

export default TrendsSkeleton;
