import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";

const useChannelHook = (id) => {
    const { data: channel } = useQuery(["channel", id], async () => {
        let { data } = await axios.get(`/users/find/${id}`);
        return data;
    });
    return { channel };
};

export default useChannelHook;
