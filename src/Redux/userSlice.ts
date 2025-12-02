import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store';

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

// Action creators are generated for each case redu cer function
export const { LOGIN, LOGOUT } = userSlice.actions

export const selectMail = (state: RootState) => state.userReducer.mail;

export default userSlice.reducer