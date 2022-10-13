import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import useForm from "../redux/Form";
import useUserHook from "../redux/userHook";
import { isOpen } from "../redux/userSlice";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Upload = () => {
    const navigate = useNavigate();
    const { dispatch } = useUserHook();
    const { state, setform } = useForm();
    const [vidPerc, setvidPerc] = useState(0);
    const [imgPerc, setimgPerc] = useState(0);
    const [videoUrl, setvideoUrl] = useState();
    const [imgUrl, setimgUrl] = useState();
    const [submit, setsubmit] = useState(true);

    const uploadFiles = async (file, type, data) => {
        const storage = getStorage(app);
        const filename = new Date().getTime() + file.name;
        const videoRef = ref(storage, `${type}/${filename}`);

        const uploadTask = uploadBytesResumable(videoRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                type === "video" ? setvidPerc(progress) : setimgPerc(progress);
            },
            (error) => {
                setsubmit(true);

                alert(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    data(downloadURL);
                });
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await uploadFiles(state.video, "video", setvideoUrl);
        await uploadFiles(state.image, "image", setimgUrl);

        setsubmit(false);
    };
    const postDb = async () => {
        const { image, video, ...other } = state;
        try {
            let res = await axios.post("video/", {
                ...other,
                imgUrl,
                videoUrl,
            });
            dispatch(isOpen(false));
            setimgPerc(0);
            setvidPerc(0);
            console.log("finished");
            res.status === 200 && navigate("/");
        } catch (error) {
            alert(error.message);
            setsubmit(true);

            console.log(error.message);
        }
    };
    useEffect(() => {
        if (imgUrl && videoUrl) {
            postDb();
        }
    }, [imgUrl, videoUrl]);

    return (
        <>
            <div className="absolute top-0 left-0 right-0 bottom-0 dark" />
            <div className=" absolute top-5 translate-x-[50%]  bg-white rounded-lg ">
                <aside className="flex flex-1 justify-between items-center border-b border-gray-200 p-3 px-6">
                    <h1 className="text-center capitalize font-bold text-xl">
                        upload videos
                    </h1>
                    <AiOutlineClose
                        className=" text-2xl cursor-pointer"
                        onClick={() => dispatch(isOpen(false))}
                    />
                </aside>
                <section className="space-y-5 rounded-md capitalize p-10">
                    <div className="border border-gray-300 rounded-sm  flex p-2">
                        <label>video:</label>

                        {vidPerc ? (
                            <span className="ml-2">
                                {"Uploading " + vidPerc + "% done"}
                            </span>
                        ) : (
                            <input
                                onChange={(e) =>
                                    setform({
                                        type: "video",
                                        payload: e.target.files[0],
                                    })
                                }
                                type="file"
                                accept="video/*"
                                className=" pl-2 truncate w-full"
                            />
                        )}
                    </div>
                    <div className="border border-gray-300 rounded-sm p-2">
                        <label>title:</label>
                        <input
                            value={state.title}
                            onChange={(e) =>
                                setform({
                                    type: "title",
                                    payload: e.target.value,
                                })
                            }
                            type="text"
                            className="bg-transparent pl-2 w-[80%] outline-none"
                        />
                    </div>
                    <div className="border border-gray-300 rounded-sm p-2">
                        <label htmlFor="">description:</label>
                        <textarea
                            value={state.description}
                            onChange={(e) =>
                                setform({
                                    type: "description",
                                    payload: e.target.value,
                                })
                            }
                            name=""
                            id=""
                            cols="60"
                            rows="3"
                            className="w-full outline-none"
                        ></textarea>
                    </div>
                    <div className="border border-gray-300 rounded-sm p-2">
                        <label htmlFor="">seperate the tags with comma:</label>
                        <input
                            value={state.tags}
                            onChange={(e) =>
                                setform({
                                    type: "tags",
                                    payload: e.target.value,
                                })
                            }
                            type="text"
                            className="bg-transparent pl-2 w-[50%] outline-none"
                        />
                    </div>
                    <div className="border border-gray-300 rounded-sm p-2 flex">
                        <label htmlFor="">image:</label>
                        {imgPerc ? (
                            <span className="ml-2">
                                {"Uploading " + imgPerc + "% done"}
                            </span>
                        ) : (
                            <input
                                onChange={(e) =>
                                    setform({
                                        type: "image",
                                        payload: e.target.files[0],
                                    })
                                }
                                type="file"
                                accept="image/*"
                                className="bg-transparent pl-2 truncate w-full"
                            />
                        )}
                    </div>
                    <div
                        className={`${
                            submit ? "bg-green-500" : "bg-gray-400"
                        } rounded-sm`}
                    >
                        <button
                            disabled={!submit}
                            className="w-full p-2 text-white"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            {!submit ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Upload;
