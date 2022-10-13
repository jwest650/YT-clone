import React, { useEffect, useState } from "react";
import Playing from "./Playing";
import { useParams } from "react-router-dom";
import axios from "axios";
import Filter from "./Filter";
import Trends from "./Trends";
import useTrends from "../redux/TrendsHook";
import PlayingSkeleton from "./PlayingSkeleton";
import TrendsSkeleton from "./TrendsSkeleton";
import Header from "./Header";
const VideoContainer = () => {
    const [count, setcount] = useState(1);
    const [loading, setloading] = useState(false);

    let { videoId } = useParams();
    const [currentVideo, setcurrentVideo] = useState("");

    const { trends, isLoading } = useTrends(videoId);
    const getCurrentVideo = async () => {
        setloading(true);
        const res = await axios.get(`/video/find/${videoId}`);
        setcurrentVideo(res?.data);
        setloading(false);
    };

    useEffect(() => {
        if (videoId) {
            getCurrentVideo();
        }
    }, [videoId]);
    return (
        <div>
            <Header />

            <div className="px-10 pt-20  bg-[#F9F9F9]">
                <section className="grid grid-cols-3 gap-5 ">
                    <div className="col-span-2 ">
                        {loading ? (
                            <PlayingSkeleton />
                        ) : (
                            <Playing
                                currentVideo={currentVideo}
                                videos={trends}
                                count={count}
                                setcount={setcount}
                            />
                        )}
                    </div>
                    <div>
                        <Filter />

                        <div className="p-3 space-y-3">
                            {isLoading
                                ? Array(10)
                                      .fill(0)
                                      .map((x, i) => <TrendsSkeleton key={i} />)
                                : trends?.map((data, i) => (
                                      <Trends trend={data} key={i} />
                                  ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default VideoContainer;
