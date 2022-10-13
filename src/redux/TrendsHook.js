import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useTrends = (id) => {
    const { data: trends, isLoading } = useQuery(["trends", id], async () => {
        let { data } = await axios.get(`/video/random`);
        return data;
    });

    return { trends, isLoading };
};

export default useTrends;
