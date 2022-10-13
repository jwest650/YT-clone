import React from "react";
import { Link } from "react-router-dom";
import useChannelHook from "../redux/ChannelHook";

const Subscriptions = ({ data }) => {
    let { channel } = useChannelHook(data);

    return (
        <div>
            <Link to={`channel/${data}`}>
                <div className="flex items-center space-x-4 ">
                    <div className="w-[25px] h-[25px] rounded-full">
                        <img
                            src={channel?.img}
                            alt=""
                            className="w-full h-full object-contain rounded-full"
                        />
                    </div>
                    <h1 className="capitalize">{channel?.name}</h1>
                </div>
            </Link>
        </div>
    );
};

export default Subscriptions;
