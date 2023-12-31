import { createSlice } from "@reduxjs/toolkit"
import { addToReadList, addWishlist, createUser, getUserData, loginUser, toggleFinished } from "./userThunk";

interface IUserState {
  user: {
    email: string | null;
    userId?: string;
    username?: string;
    wishlist?: string[];
    readingList?: string[];
    finished?: string[]; 
    _id?: string;

  }
  isLoading: boolean
  isError: boolean
  error: string | null
}



const initialState: IUserState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
}

  

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.email = action.payload
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    logout: (state) => {
      state.user = { email: null}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user.email = null
        state.error = action.error.message!
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user.email = null
        state.error = action.error.message!
      })
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true
        state.isError = false
        state.error = null
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.user.email = null
        state.error = action.error.message!
      })
      .addCase(addWishlist.pending, (state) => {
        state.isError = false
        state.error = null
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(addWishlist.rejected, (state, action) => {
        state.isError = true
        state.error = action.error.message!
      })
      .addCase(addToReadList.pending, (state) => {
        state.isError = false
        state.error = null
      })
      .addCase(addToReadList.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(addToReadList.rejected, (state, action) => {
        state.isError = true
        state.error = action.error.message!
      })
      .addCase(toggleFinished.pending, (state) => {
        state.isError = false
        state.error = null
      })
      .addCase(toggleFinished.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(toggleFinished.rejected, (state, action) => {
        state.isError = true
        state.error = action.error.message!
      })
  },
})

export const { setUser, setLoading, logout } = userSlice.actions
export default userSlice.reducer
