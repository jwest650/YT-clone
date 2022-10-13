import { useDispatch, useSelector } from "react-redux";

const useUserHook = () => {
    const user = useSelector((state) => state.user.user);
    const toggle = useSelector((state) => state.user.toggle);

    const dispatch = useDispatch();
    return { user, dispatch, toggle };
};

export default useUserHook;
