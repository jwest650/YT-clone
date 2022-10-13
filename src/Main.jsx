import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";
import SignInPage from "./components/SignInPage";
import Upload from "./components/Upload";
import VideoContainer from "./components/VideoContainer";
import Videos from "./components/Videos";
import Channel from "./pages/Channel";
import Home from "./pages/Home";
import useUserHook from "./redux/userHook";
import { isOpen } from "./redux/userSlice";

const Main = () => {
    // useEffect(() => {
    //     if (toggle) {
    //         let el = document.querySelector(".dark");
    //         el.addEventListener("click", clearDark);
    //     }
    // }, [toggle]);
    // const clearDark = (e) => {
    //     if (e.target.className === "dark") {
    //         dispatch(isOpen(false));
    //         console.log(e.target);
    //     }
    // };
    return (
        <section className="w-full">
            {/* header */}

            <main className="bg-gray-[#F9F9F9] ">
                <Routes>
                    <Route path={"/"} element={<Home />}>
                        <Route index element={<Videos />} />
                        <Route
                            path={"channel/:channelId"}
                            element={<Channel />}
                        />
                    </Route>
                    <Route
                        path="/video/:videoId"
                        element={<VideoContainer />}
                    />
                    <Route path="/signin" element={<SignInPage />} />
                </Routes>
            </main>
        </section>
    );
};

export default Main;
