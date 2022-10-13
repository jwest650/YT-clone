import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Home = () => {
    return (
        <div className="">
            <Header />

            <section className="flex">
                {/* sidebar */}
                <Sidebar />
                <Outlet />
            </section>
        </div>
    );
};

export default Home;
