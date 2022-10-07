import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    user: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            const data = action.payload;
            state.isAuth = data.isLogin;
            state.user = data.user
        },

    },
})

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions

export default authSlice.reducer;