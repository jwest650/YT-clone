import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const PlayingSkeleton = () => {
    return (
        <div>
            <div className="flex-1">
                <Skeleton height={450} />
            </div>
            <div className="w-32 my-2">
                <Skeleton />
            </div>
            <aside className="flex justify-between ">
                <div className="w-40">
                    <Skeleton />
                </div>
                <div className="space-x-4 flex items-center">
                    <Skeleton circle width={30} height={30} />
                    <Skeleton circle width={30} height={30} />
                    <Skeleton circle width={30} height={30} />
                    <Skeleton circle width={30} height={30} />
                </div>
            </aside>

            <section className="flex  justify-between items-end">
                <aside className="flex  space-x-2">
                    <div>
                        <Skeleton circle width={40} height={40} />
                    </div>
                    <div className="">
                        <Skeleton width={60} height={10} />
                        <Skeleton width={60} height={10} />
                    </div>
                </aside>

                <aside className="flex items-center space-x-2">
                    <Skeleton width={56} height={10} />
                    <Skeleton width={56} height={10} />
                </aside>
            </section>
            <div className="flex-1 mx-12">
                <Skeleton />
            </div>
        </div>
    );
};

export default PlayingSkeleton;
