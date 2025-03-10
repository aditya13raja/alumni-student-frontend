import { createSlice } from "@reduxjs/toolkit";

// Define initial state for the slice
const initialState = {
    currentUser: null,
    error: null,
    loading: null,
}

const userSlice = createSlice({
    // Give a name to the slice to be stored in store
    name: "user",
    initialState,

    // Define reducers(functions) 
    reducers: {
        // Tell redux-store that auth started
        authStart: (state) => {
            state.loading = true;
        },

        // Save user info after signIn or signUp success 
        authSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },

        // Get error if error occurs
        authFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },

        // Create reducer for sign out
        signOutUserStart: (state) => {
            state.loading = true;
        },

        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },

        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }, 
    }
})

// Export reducer functions which are assigned to do specific tasks
export const {
    authStart,
    authSuccess,
    authFailure,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure,
} = userSlice.actions;

// Export all reducers
export default userSlice.reducer;
