import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as timeago from "timeago.js";
import axios from "axios";

const Trends = ({ trend }) => {
    const [channel, setchannel] = useState();
    async function getChannel() {
        let res = await axios.get(`/users/find/${trend?.userId}`);
        setchannel(res?.data);
    }
    useEffect(() => {
        if (trend) {
            getChannel();
        }
    }, [trend]);
    return (
        <div className="">
            <Link to={`/video/${trend?._id}`}>
                <section className="flex space-x-2 ">
                    <div className="w-48 h-[105px] ">
                        <img
                            src={trend?.imgUrl}
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    <div className="">
                        <p className=" capitalize  font-bold text-md">
                            {trend?.title}
                        </p>
                        <p className="text-md capitalize text-[#606060]">
                            {channel?.name}
                        </p>
                        <div className="text-[#606060] flex items-center space-x-1">
                            <p> {trend?.views} views </p>
                            <div className="w-[3px] bg-slate-400 h-[3px] rounded" />{" "}
                            <p> {timeago.format(trend?.createdAt)}</p>
                        </div>
                        <p className="bg-gray-100 w-fit px-2 text-sm mt-1">
                            New
                        </p>
                    </div>
                </section>
            </Link>
        </div>
    );
};

export default Trends;
