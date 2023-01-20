import { createSlice } from "@reduxjs/toolkit";

const initialBrewState = {
  currentQuery: "",
  currentPage: 1,
  favorites: [],
};

const brewSlice = createSlice({
  name: "brew",
  initialState: initialBrewState,
  reducers: {
    setQuery(state, action) {
          const query = action.payload;
          console.log('QUERY', query)
      state.currentQuery = query;
    },
    setPage(state, action) {
      const page = action.payload;
      state.currentPage = page;
    },
    setFavorites(state, action) {
        state.favorites = action.payload;
    },
      toggleFavorite(state, action) {
          const faves = state.favorites;
  
    },
  },
});

export const brewActions = brewSlice.actions;

export default brewSlice;
