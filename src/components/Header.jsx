import React from "react";
import { FiMenu } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { BsMic } from "react-icons/bs";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import useUserHook from "../redux/userHook";
import { adduser, isOpen } from "../redux/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { TbUserCircle } from "react-icons/tb";

const Header = () => {
    let navigate = useNavigate();

    const { user, dispatch, toggle } = useUserHook();
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            dispatch(adduser(null));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-between items-center   px-3  cursor-pointer fixed w-full bg-white">
            {/* left */}
            <section className="flex items-center  space-x-7 ">
                <FiMenu className=" text-xl text-gray-400" />
                <Link to="/">
                    <div className="flex items-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                            alt=""
                            width={30}
                            height={30}
                        />
                        <h1 className="font-bold text-xl pl-2 capitalize">
                            youtube
                        </h1>
                    </div>
                </Link>
            </section>

            {/* middle */}
            <section className="flex items-center w-2/5  p-1 ">
                <div className="space-x-7 flex items-center border border-gray-200 h-10 w-full mx-2 pl-2">
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent text-md outline-none flex-1  "
                    />
                    <BiSearch className="bg-gray-100 text-gray-400 text-xl h-full p-2  w-16 " />
                </div>

                <BsMic className=" text-4xl  bg-gray-100 rounded-full p-2  " />
            </section>

            {/* right */}
            {!user ? (
                <div className="flex space-x-2">
                    {" "}
                    <button>
                        <FiMoreVertical />
                    </button>{" "}
                    <button
                        className="border border-blue-500 uppercase text-blue-500 flex items-center p-1 px-5 space-x-2"
                        onClick={() => navigate("/signin")}
                    >
                        <TbUserCircle className="text-xl" />{" "}
                        <span>sign in</span>
                    </button>
                </div>
            ) : (
                <section className="flex items-center space-x-7">
                    <AiOutlineVideoCameraAdd
                        className=" "
                        onClick={() => dispatch(isOpen(!toggle))}
                    />
                    <IoIosNotificationsOutline className=" text-xl" />
                    {user?.img ? (
                        <img
                            src={user?.img}
                            alt=""
                            className="w-[30px] h-[30px] rounded-full"
                            onClick={handleSignOut}
                        />
                    ) : (
                        <div
                            className="w-[30px] h-[30px] rounded-full bg-orange-500 text-white flex justify-center capitalize flex-col items-center"
                            onClick={handleSignOut}
                        >
                            <p className="text-xl">{user?.name?.slice(0, 1)}</p>
                        </div>
                    )}
                </section>
            )}
        </div>
    );
};

export default Header;
