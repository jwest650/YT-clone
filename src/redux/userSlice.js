import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    toggle: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        adduser: (state, action) => {
            state.user = action.payload;
        },

        isOpen: (state, action) => {
            state.toggle = action.payload;
        },
        addvideo: (state, action) => {
            state.videos = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { adduser, isOpen, addvideo } = userSlice.actions;

export default userSlice.reducer;
