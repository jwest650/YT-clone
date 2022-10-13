import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useState } from "react";
import useChannelHook from "./../redux/ChannelHook";
import CommentText from "./CommentText";

const Comments = ({ user, videoId }) => {
    const [comment, setcomment] = useState("");
    const addComment = async (e) => {
        e.preventDefault();
        let userId = user._id;
        let desc = comment;
        if (desc) {
            let { data } = await axios.post("/comments", {
                userId,
                videoId,
                desc,
            });
            setcomment("");
        }
    };
    const { data, isLoading } = useQuery(["comments", comment], async () => {
        let { data } = await axios.get(`/comments/${videoId}`);

        return data;
    });
    return (
        <section className="space-y-5">
            <div>
                <p>{data?.length} Comments</p>
            </div>
            <div className="flex items-center space-x-3">
                {user?.img ? (
                    <img
                        src={user?.img}
                        alt=""
                        className=" w-10 h-10 object-contain rounded-full "
                    />
                ) : (
                    <div className=" w-10 h-10 object-contain rounded-full  bg-orange-500 text-white flex flex-col justify-center capitalize items-center">
                        <p className="text-2xl">{user?.name?.slice(0, 1)}</p>
                    </div>
                )}

                <form className="flex-1" onSubmit={addComment}>
                    <input
                        value={comment}
                        onChange={(e) => setcomment(e.target.value)}
                        placeholder="Add comment"
                        type="text"
                        className="w-full h-full border-b bg-transparent outline-none"
                    />
                </form>
            </div>
            <article className="space-y-5">
                {data?.map((value, i) => (
                    <CommentText data={value} key={i} />
                ))}
            </article>
        </section>
    );
};

export default Comments;
