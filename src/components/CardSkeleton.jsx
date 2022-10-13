import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const CardSkeleton = () => {
    return (
        <div className="">
            <div>
                <Skeleton height={150} />
            </div>
            <div className="flex space-x-3 mt-2">
                <div>
                    <Skeleton circle width={40} height={40} />
                </div>
                <div className="flex-[0.7]">
                    <Skeleton count={2} />
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
