// reducers/videoReducer.js
import { createSlice } from '@reduxjs/toolkit';

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    videoUrl: null,
    videoName: null,
  },
  reducers: {
    setVideo(state, action) {
      state.videoUrl = action.payload.videoUrl;
      state.videoName = action.payload.videoName;
    },
    clearVideo(state) {
      state.videoUrl = null;
      state.videoName = null;
    },
  },
});

export const { setVideo, clearVideo } = videoSlice.actions;
export default videoSlice.reducer;
