import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AiTwotoneDislike, AiTwotoneLike } from "react-icons/ai";
import { RiMoreLine } from "react-icons/ri";
import { BsBell } from "react-icons/bs";
import { MdPlaylistAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import useChannelHook from "../redux/ChannelHook";
import useUserHook from "../redux/userHook";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Comments from "./Comments";

const Playing = ({ currentVideo, videos, count, setcount }) => {
    const style = {
        fill: "brown",
    };
    const [icon, seticon] = useState("");

    const navigate = useNavigate();
    const { videoId } = useParams();
    const [like, setlike] = useState([]);
    const [dislike, setdislike] = useState([]);

    const [duration, setduration] = useState();
    const [played, setplayed] = useState(null);
    const [subscribed, setsubscribed] = useState("");

    let videoRef = useRef();

    const { channel } = useChannelHook(currentVideo.userId);
    const { user } = useUserHook();
    const { data: userinfo } = useQuery(["userinfo", subscribed], async () => {
        let { data } = await axios(`/users/find/${user._id}`);

        return data;
    });
    const { data } = useQuery(
        ["views", duration],
        async () => {
            let { data } = await axios.put(`/video/view/${videoId}`);
            return data;
        },
        { enabled: duration === 10 }
    );
    const handleLoadedMetadata = () => {
        const video = videoRef.current;
        setduration(Math.round(video.currentTime));
    };
    const subscribe = async () => {
        if (
            userinfo &&
            channel._id !== userinfo?._id &&
            !userinfo.subscribedUsers.includes(channel._id)
        ) {
            await axios.put(`/users/sub/${channel._id}`);
            setsubscribed("subscribed");

            console.log("subcribed");
        }
        if (
            userinfo &&
            channel._id !== userinfo?._id &&
            userinfo?.subscribedUsers.includes(channel._id)
        ) {
            await axios.put(`/users/unsub/${channel._id}`);
            setsubscribed("subscribe");

            console.log("unsub");
        }
    };

    const handleLike = async () => {
        let { data } = await axios.put(`/users/likes/${currentVideo._id}`);

        if (data) {
            let { data } = await axios.get(`/video/find/${videoId}`);
            setlike(data.likes);
            setdislike(data.dislikes);
        }
    };
    const handleDislike = async () => {
        let { data } = await axios.put(`/users/dislikes/${currentVideo._id}`);
        if (data) {
            let { data } = await axios.get(`/video/find/${videoId}`);

            setdislike(data.dislikes);
            setlike(data.likes);
        }
    };

    useLayoutEffect(() => {
        if (userinfo?.subscribedUsers?.includes(channel?._id)) {
            setsubscribed("subscribed");
        } else {
            setsubscribed("subscribe");
        }

        async function loadlikes() {
            let { data } = await axios.get(`/video/find/${videoId}`);
            setlike(data.likes);
            setdislike(data.dislikes);
        }
        loadlikes();
    }, [channel]);

    const ended = () => {
        setplayed(videos[count]?.videoUrl);
        if (count == videos?.length - 1) {
            setcount(0);
        } else {
            setcount((x) => x + 1);
        }

        navigate(`/video/${videos[count]?._id}`);
    };
    useEffect(() => {
        if (like.includes(user?._id)) {
            seticon("like");
        }
        if (dislike.includes(user?._id)) {
            seticon("dislike");
        }
    }, [like, dislike]);

    return (
        <section className="w-full h-full space-y-1">
            <article className="h-[450px]">
                <video
                    autoPlay={true}
                    onEnded={ended}
                    onTimeUpdate={handleLoadedMetadata}
                    ref={videoRef}
                    src={played || currentVideo?.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                />
            </article>

            <p className="capitalize text-xl">{currentVideo?.title}</p>
            <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                <div className="text-gray-600 text-sm flex items-center space-x-1">
                    <p>{currentVideo?.views} views</p>
                    <div className="w-[3px] bg-slate-400 h-[3px] rounded" />
                    <p> {new Date(currentVideo?.createdAt).toDateString()}</p>
                </div>
                <div className="flex items-center text-2xl space-x-5">
                    <button className="flex items-center " onClick={handleLike}>
                        <AiTwotoneLike
                            className="mr-2"
                            style={icon == "like" && style}
                        />{" "}
                        <p className="text-lg text-bold">
                            {" "}
                            {like?.length || 0}
                        </p>
                    </button>
                    <button
                        className="flex items-center"
                        onClick={handleDislike}
                    >
                        <AiTwotoneDislike
                            className="mr-2"
                            style={icon == "dislike" && style}
                        />
                        <p className="text-lg text-bold">
                            {" "}
                            {dislike?.length || 0}
                        </p>
                    </button>
                    <button>
                        <MdPlaylistAdd />
                    </button>
                    <button>
                        <RiMoreLine />
                    </button>
                </div>
            </div>
            <article className="py-4">
                <div className="flex items-center justify-between">
                    <main className="flex space-x-2 mb-4">
                        {channel?.img ? (
                            <img
                                src={channel?.img}
                                alt=""
                                className="rounded-full w-[40px] h-[40px]"
                            />
                        ) : (
                            <div className=" w-[40px] h-[40px] object-contain rounded-full  bg-orange-500 text-white flex justify-center flex-col items-center capitalize">
                                <p className="text-4xl">
                                    {channel?.name?.slice(0, 1)}
                                </p>
                            </div>
                        )}

                        <div className="leading-5">
                            <p className="capitalize">{channel?.name}</p>
                            <small className="text-gray-600">
                                {channel?.subscribers} subscribers
                            </small>
                        </div>
                    </main>
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
                </div>
                <p className="pl-12">{currentVideo?.desc}</p>
            </article>
            <hr />
            <Comments user={user} videoId={currentVideo?._id} />
        </section>
    );
};

export default Playing;
