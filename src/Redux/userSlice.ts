import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  mail: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    LOGIN: (state, actions: PayloadAction<{ token: string; mail: string }>) => {
        state.token = actions.payload.token;
        state.mail = actions.payload.mail;
        console.log(">>>Check redux: ", state.token, state.mail )
    },
    LOGOUT: (state) => {
        state.token = '';
        state.mail = '';
    },
  },
})

// Action creators are generated for each case reducer function
export const { LOGIN, LOGOUT } = userSlice.actions

export default userSlice.reducer