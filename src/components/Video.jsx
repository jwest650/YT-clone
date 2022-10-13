import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as timeago from "timeago.js";
import axios from "axios";
const Video = ({ data }) => {
    let videoId = data?._id;
    const [channel, setchannel] = useState();
    async function getChannel() {
        let res = await axios.get(`users/find/${data?.userId}`);
        setchannel(res.data);
    }
    useEffect(() => {
        getChannel();
    }, [videoId]);
    return (
        <div className="">
            <Link to={`video/${videoId}`}>
                <section className="">
                    <div className=" h-[150px] mb-2">
                        <img
                            src={data.imgUrl}
                            alt=""
                            className="w-full h-full"
                        />
                    </div>
                    <div className="flex  space-x-3">
                        {channel?.img ? (
                            <img
                                src={channel?.img}
                                alt=""
                                className=" w-[35px] h-[35px] object-contain rounded-full mt-2 "
                            />
                        ) : (
                            <div className=" w-[35px] h-[35px] object-contain rounded-full mt-2 bg-orange-500 text-white flex flex-col items-center justify-center capitalize">
                                <p className="text-2xl">
                                    {channel?.name?.slice(0, 1)}
                                </p>
                            </div>
                        )}

                        <div className="text-gray-500 ">
                            <p className="font-bold capitalize  text-black">
                                {data.title}
                            </p>
                            <p className="text-sm capitalize">
                                {channel?.name}
                            </p>
                            <div className="flex items-center space-x-1">
                                <p>{data.views} views</p>
                                <div className="w-[3px] bg-slate-400 h-[3px] rounded" />{" "}
                                <p> {timeago.format(data.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </Link>
        </div>
    );
};

export default Video;
