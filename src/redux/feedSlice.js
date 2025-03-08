import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchPhotos = createAsyncThunk('feed/fetchPhotos', async () => {
    const API_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
    const response = await axios.get(`https://api.unsplash.com/photos/random?count=1000&client_id=${API_KEY}`);
    return response.data;
});


const feedSlice = createSlice({
    name: 'feed',
    initialState: { photos: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotos.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchPhotos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.photos = [...state.photos, ...action.payload];
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});


export const store = configureStore({
    reducer: {
        feed: feedSlice.reducer,
    },
});

export default feedSlice.reducer;
