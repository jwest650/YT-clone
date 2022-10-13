import React from "react";
import { DoubleBounce, Wave } from "better-react-spinkit";

const Loading = () => {
    return (
        <div className=" absolute top-0 right-0 left-0 bottom-0 dark">
            {/* <div className="dark absolute top-0 right-0 left-0 bottom-0" /> */}
            <div className="flex flex-col justify-center items-center h-full space-y-4">
                <DoubleBounce size={100} color="white" />
                <p className="text-white uppercase text-lg">Logging in ....</p>
            </div>
        </div>
    );
};

export default Loading;
