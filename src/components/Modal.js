import React from "react";
import { createPortal } from "react-dom";
import useUserHook from "./../redux/userHook";

const Modal = ({ children }) => {
    const { toggle, dispatch } = useUserHook();

    if (!toggle) return null;
    return createPortal(children, document.getElementById("modal"));
};

export default Modal;
