import React, { useLayoutEffect, useState } from "react";
import { BsBell } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import image from "../assets/pexels-fwstudio-131634.jpg";
import ChannelTab from "../components/ChannelTab";
import useUserHook from "../redux/userHook";
import useChannelHook from "./../redux/ChannelHook";
import * as timeago from "timeago.js";
import axios from "axios";

const Channel = () => {
    const { user } = useUserHook();
    const [videos, setvideos] = useState([]);
    let { channelId } = useParams();
    let { channel } = useChannelHook(channelId);
    const [subscribed, setsubscribed] = useState("");

    const subscribe = async () => {
        if (
            user &&
            channel._id !== user._id &&
            !user.subscribedUsers.includes(channel._id)
        ) {
            const { data } = await axios.put(`/users/sub/${channel._id}`);

            setsubscribed("subscribed");
        }
    };
    useLayoutEffect(() => {
        if (user?.subscribedUsers?.includes(channel?._id)) {
            setsubscribed("subscribed");
        } else {
            setsubscribed("subscribe");
        }
        async function getVideos() {
            const res = await axios.get(`/video/trends`);
            let result = res.data?.filter((value) => value.userId == channelId);
            setvideos(result);
        }
        getVideos();
    }, [channelId]);
    return (
        <div className="ml-60 pt-12 bg-[#F1F1F1] h-screen w-full overflow-hidden overflow-y-auto">
            <div className="w-full h-44 ">
                <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            <section className="bg-[#F9F9F9] p-5 px-4 space-y-3">
                <header className="flex justify-between items-center  ">
                    <div className="flex space-x-4 items-center">
                        <div className="w-[55px] h-[55px]">
                            <img
                                src={channel?.img}
                                alt=""
                                className="w-full h-full object-contain rounded-full"
                            />
                        </div>
                        <div>
                            <h1 className="text-lg capitalize">
                                {channel?.name}
                            </h1>
                            <p className="">
                                {channel?.subscribers} subscriber
                            </p>
                        </div>
                    </div>
                    <aside className="flex space-x-3 items-center pr-3">
                        <button
                            className={`${
                                subscribed === "subscribed"
                                    ? "bg-[#ECECEC] text-[#9D9D9D]"
                                    : "bg-[#CC0000] text-white"
                            } rounded px-3 py-1 uppercase `}
                            onClick={subscribe}
                        >
                            {subscribed}
                        </button>
                        <BsBell className="text-xl" />
                    </aside>
                </header>
                <ChannelTab />
            </section>
            <section className="px-5">
                <h1 className="text-lg capitalize">uploads</h1>
                <div className="p-4  grid grid-cols-4 gap-5">
                    {videos?.map((v, i) => (
                        <Link to={`/video/${v._id}`} key={i}>
                            <div>
                                <div className=" h-[150px] mb-2">
                                    <img
                                        src={v.imgUrl}
                                        alt=""
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="flex  space-x-3">
                                    <img
                                        src={channel?.img}
                                        alt=""
                                        className=" w-[35px] h-[35px] object-contain rounded-full mt-2 "
                                    />
                                    <div className="text-gray-500 ">
                                        <p className="font-bold capitalize  text-black">
                                            {v?.title}
                                        </p>
                                        <p className="text-sm capitalize">
                                            {channel?.name}
                                        </p>
                                        <small className="flex items-center space-x-1">
                                            <p>{v?.views} views</p>
                                            <div className="w-[3px] bg-slate-400 h-[3px] rounded" />{" "}
                                            <p>
                                                {" "}
                                                {timeago.format(v?.createdAt)}
                                            </p>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Channel;
