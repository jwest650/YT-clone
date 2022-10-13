import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const useData = () => {
    const { data, isLoading } = useQuery(["random"], async () => {
        let { data } = await axios.get("/video/random");
        return data;
    });
    return { data, isLoading };
};

export default useData;
