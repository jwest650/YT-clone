import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiFillHome, AiOutlineHistory, AiOutlineLike } from "react-icons/ai";
import {
    MdOutlineExplore,
    MdVideoSettings,
    MdOutlineSubscriptions,
    MdOutlineVideoLibrary,
} from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import { BsStopwatch } from "react-icons/bs";
import useUserHook from "../redux/userHook";
import useChannelHook from "./../redux/ChannelHook";
import Subscriptions from "./Subscriptions";
import { TbUserCircle } from "react-icons/tb";

const Sidebar = () => {
    let navigate = useNavigate();
    const { user } = useUserHook();
    let { channel } = useChannelHook(user?._id);
    const activeStyle = {
        backgroundColor: "#E5E5E5",
    };
    return (
        <div className="w-60 text-sm py-6 mt-10 fixed  h-screen overflow-y-auto overflow-hidden pb-20 ">
            <section className="space-y-2 border-b border-gray-300 px-3 p-1 pb-5">
                <div>
                    <NavLink
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                        to={"/"}
                        className="flex p-2 items-center capitalize space-x-4"
                    >
                        <AiFillHome className="text-2xl" />
                        <p>home</p>
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                        to={"explore"}
                        className="flex p-2 items-center capitalize space-x-4"
                    >
                        <MdOutlineExplore className="text-2xl" />
                        <p>explore</p>
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                        to={"shorts"}
                        className="flex p-2 items-center capitalize space-x-4"
                    >
                        <MdVideoSettings className="text-2xl" />
                        <p>shorts</p>
                    </NavLink>
                </div>
                <div>
                    <NavLink
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                        to={"subscriptions"}
                        className="flex p-2 items-center capitalize space-x-4"
                    >
                        <MdOutlineSubscriptions className="text-2xl" />
                        <p>subscriptions</p>
                    </NavLink>
                </div>
            </section>
            {!user ? (
                <section className="p-3 space-y-3">
                    <p className="text-md ">
                        Sign in to like videos, comment, and subscribe.
                    </p>
                    <button
                        className="border border-blue-500 uppercase text-blue-500 flex items-center p-1 px-5 space-x-2"
                        onClick={() => navigate("/signin")}
                    >
                        <TbUserCircle className="text-xl" />{" "}
                        <span>sign in</span>
                    </button>
                </section>
            ) : (
                <>
                    <section className="space-y-1 border-b border-gray-300 py-4 p-3">
                        <div>
                            <NavLink
                                style={({ isActive }) =>
                                    isActive ? activeStyle : null
                                }
                                to={"library"}
                                className="flex p-2 items-center capitalize space-x-4"
                            >
                                <MdOutlineVideoLibrary className="text-2xl" />
                                <p>library</p>
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                style={({ isActive }) =>
                                    isActive ? activeStyle : null
                                }
                                to={"history"}
                                className="flex p-2 items-center capitalize space-x-4"
                            >
                                <AiOutlineHistory className="text-2xl" />
                                <p>history</p>
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                style={({ isActive }) =>
                                    isActive ? activeStyle : null
                                }
                                to={"yourvideos"}
                                className="flex p-2 items-center capitalize space-x-4"
                            >
                                <RiVideoLine className="text-2xl" />
                                <p>your videos</p>
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                style={({ isActive }) =>
                                    isActive ? activeStyle : null
                                }
                                to={"watchlater"}
                                className="flex p-2 items-center capitalize space-x-4"
                            >
                                <BsStopwatch className="text-2xl" />
                                <p>watch later</p>
                            </NavLink>
                        </div>
                        <div>
                            <NavLink
                                style={({ isActive }) =>
                                    isActive ? activeStyle : null
                                }
                                to={"liked"}
                                className="flex p-2 items-center capitalize space-x-4"
                            >
                                <AiOutlineLike className="text-2xl" />
                                <p>liked videos</p>
                            </NavLink>
                        </div>
                    </section>
                    <section className="p-3 space-y-3">
                        <h1 className=" text-gray-600 uppercase  font-bold">
                            Subscriptions
                        </h1>
                        <div className="space-y-5">
                            {channel?.subscribedUsers?.map((value, i) => (
                                <Subscriptions data={value} key={i} />
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default Sidebar;
