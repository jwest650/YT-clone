import React from "react";
import useChannelHook from "../redux/ChannelHook";

const CommentText = ({ data }) => {
    const { channel } = useChannelHook(data.userId);
    return (
        <section className="flex items-center">
            {channel?.img ? (
                <img
                    src={channel?.img}
                    alt=""
                    className=" w-10 h-10 object-contain rounded-full "
                />
            ) : (
                <div className=" w-10 h-10 object-contain rounded-full  bg-orange-500 text-white flex flex-col justify-center capitalize items-center">
                    <p className="text-2xl">{channel?.name?.slice(0, 1)}</p>
                </div>
            )}

            <div className="ml-4">
                <p className="text-sm capitalize font-bold ">{channel?.name}</p>
                <p className="text-sm">{data?.desc}</p>
            </div>
        </section>
    );
};

export default CommentText;
