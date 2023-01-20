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
    setFavorites(state) {
      const localStorageFavorites = JSON.parse(
        localStorage.getItem("favorites")
      );
      if (localStorageFavorites === "null") {
        state.favorties = [];
      } else {
        state.favorties = localStorageFavorites;
      }
    },
    toggleFavorite(state, action) {
      const brewery = action.payload;
        console.log(brewery);
        state.favorites = [brewery];
        console.log(state.favorites)
    //   const existingFavorite = state.favorites.find(
    //     (fave) => fave.id === brewery.id
    //   );
    //   let updatedFavorites;
    //   if (existingFavorite) {
    //     updatedFavorites = state.favorites.filter(
    //       (fave) => fave.id !== BreweryFeature.id
    //     );
    //   } else {
    //     updatedFavorites = state.favorites.push(brewery);
    //     state.favorites = updatedFavorites;
    //   }
    },
  },
});

export const brewActions = brewSlice.actions;

export default brewSlice;
