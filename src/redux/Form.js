import { useReducer } from "react";

const initialState = {
    video: "",
    title: "",
    desc: "",
    tags: "",
    image: "",
};

function formreducer(state, action) {
    switch (action.type) {
        case "video":
            return { ...state, video: action.payload };
        case "title":
            return { ...state, title: action.payload };

        case "description":
            return { ...state, desc: action.payload };

        case "tags":
            return { ...state, tags: action.payload.split(",") };

        case "image":
            return { ...state, image: action.payload };

        default:
            return state;
    }
}

const useForm = () => {
    const [state, setform] = useReducer(formreducer, initialState);

    return { state, setform };
};

export default useForm;
