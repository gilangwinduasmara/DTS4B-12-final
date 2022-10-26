// authSlice
import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../services/firebase";

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authAsync = createAsyncThunk("auth/authAsync", async (payload) => {
    const { email, password } = payload;
    const user = await auth.signInWithEmailAndPassword(email, password);
    return user;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(authAsync.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(authAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const { setUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;