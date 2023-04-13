import React from "react";
import { Link } from "react-router-dom";
import useChannelHook from "../redux/ChannelHook";

const Subscriptions = ({ data }) => {
    let { channel } = useChannelHook(data);

    return (
        <div>
            <Link to={`channel/${data}`}>
                <div className="flex items-center space-x-4 ">
                    {channel?.img ? (
                        <img
                            src={channel?.img}
                            alt=""
                            className=" w-[25px] h-[25px] object-contain rounded-full  "
                        />
                    ) : (
                        <div className=" w-[25px] h-[25px] object-contain rounded-full  bg-orange-500 text-white flex flex-col items-center justify-center capitalize">
                            <p className="text-2xl">
                                {channel?.name?.slice(0, 1)}
                            </p>
                        </div>
                    )}

                    <h1 className="capitalize">{channel?.name}</h1>
                </div>
            </Link>
        </div>
    );
};

export default Subscriptions;
