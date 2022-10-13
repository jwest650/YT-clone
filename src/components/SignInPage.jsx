import React, { useState } from "react";
import { BiUserPin } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { ImGoogle2 } from "react-icons/im";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { adduser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const provider = new GoogleAuthProvider();
const SignInPage = () => {
    const [isLoading, setisLoading] = useState(false);
    const [user, setuser] = useState({
        name: "",
        password: "",
    });
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const signUser = async () => {
        setisLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const { displayName, email, photoURL } = result.user;
            const res = await axios.post(
                "/auth/google",

                {
                    name: displayName,
                    email,
                    img: photoURL,
                }
            );

            dispatch(adduser(res.data));
            setisLoading(false);
            navigate("/");
        } catch (error) {
            setisLoading(false);

            console.log(error);
        }
    };
    const handleChange = (e) => {
        setuser((state) => ({ ...state, [e.target.name]: e.target.value }));
    };
    const Login = async () => {
        setisLoading(true);
        try {
            let res = await axios.post(
                "/auth/signin",

                { ...user }
            );

            dispatch(adduser(res.data));
            setisLoading(false);
            navigate("/");
        } catch (error) {
            setisLoading(false);

            console.log(error);
        }
    };

    return (
        <>
            {isLoading && <Loading />}

            <div className="signin h-screen w-screen text-white flex  items-center justify-center">
                <section className="space-y-3 w-56 ">
                    <div className="border-2 border-white rounded-full h-20 w-20 flex justify-center items-center mx-auto mb-7">
                        <p className="text-4xl">D</p>
                    </div>
                    <div className="bg-[#0f0f0f5e] rounded-full flex items-center p-2 px-4 justify-center">
                        <BiUserPin className="text-2xl" />
                        <input
                            name="name"
                            onChange={handleChange}
                            type="text"
                            className="w-full h-full bg-transparent  outline-none pl-1 "
                            placeholder="Username"
                        />
                    </div>
                    <div className="bg-[#0f0f0f5e] rounded-full flex items-center p-2 px-4 justify-center">
                        <HiOutlineLockClosed className="text-2xl" />
                        <input
                            name="password"
                            onChange={handleChange}
                            type="text"
                            className="w-full h-full bg-transparent  outline-none pl-1"
                            placeholder="Password"
                        />
                    </div>
                    <div
                        className="bg-[#F53060] cursor-pointer rounded-full p-2"
                        onClick={Login}
                    >
                        <p className="capitalize text-center">
                            {!isLoading ? "log in " : "logging in"}
                        </p>
                    </div>
                    <p className="text-center text-sm capitalize">
                        sign in with google
                    </p>
                    <div
                        className="flex items-center justify-center"
                        onClick={signUser}
                    >
                        <div className="w-20 h-[1px] border " />
                        <ImGoogle2 className="text-3xl cursor-pointer mx-3" />
                        <div className="w-20 h-[1px] border " />
                    </div>
                </section>
            </div>
        </>
    );
};

export default SignInPage;
