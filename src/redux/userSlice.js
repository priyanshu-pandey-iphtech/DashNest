import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
    user: storedUser,
    isAuthenticated: !!storedUser, // Boolean to track login state
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        registerUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true; // Auto-login after registration
            localStorage.setItem("user", JSON.stringify(action.payload));
            localStorage.setItem("isLoggedIn", "true");
        },
        loginUser: (state, action) => {
            const storedUser = JSON.parse(localStorage.getItem("user"));

            if (
                storedUser &&
                storedUser.email === action.payload.email &&
                storedUser.password === action.payload.password
            ) {
                state.isAuthenticated = true;
                state.user = storedUser;
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("user", JSON.stringify(storedUser)); // Ensure data consistency
            } else {
                state.isAuthenticated = false;
                state.user = null;
            }
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user");
        },
    },
});

export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
