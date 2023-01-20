import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import MobileNavigation from "./components/MobileNavigation";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { useSelector, useDispatch } from 'react-redux';
import {brewActions} from './store/brew-slice'

function App() {
  const dispatch = useDispatch();
  const brewQuery = useSelector(state => state.brew.currentQuery);
  const curPage = useSelector((state) => state.brew.currentPage);
  const userFavorites = useSelector((state) => state.brew.favorites);
   console.log('app page', curPage);

  // dispatch(brewActions.setFavorites());


  
  const [breweries, setBreweries] = useState([]);
  const [breweryData, setBreweryData] = useState({});
  // const ctx = useContext(BrewContext);
  // const storage = localStorage.getItem("favorites");
  // if (storage) ctx.favorites = JSON.parse(storage);

  const perPage = 8;
  // GETS LIST OF BREWERIES
 
  const loadSearchResults = async function () {
    console.log(curPage);
    try {
      const res = await fetch(
        `https://api.openbrewerydb.org/breweries?by_city=${brewQuery}&per_page=${perPage}&page=${curPage}`
      );
      const data = await res.json();
      setBreweries(data);
    } catch (err) {
      throw err;
    }
  };

   const loadSearchResultsOnPageChange = async function (page) {
     console.log(curPage);
     try {
       const res = await fetch(
         `https://api.openbrewerydb.org/breweries?by_city=${brewQuery}&per_page=${perPage}&page=${page}`
       );
       const data = await res.json();
       setBreweries(data);
     } catch (err) {
       throw err;
     }
   };

  // GETS DATA ON INDIVIDUAL BREWERY -
  const getBrewery = async function (id) {
    try {
      const res = await fetch(`https://api.openbrewerydb.org/breweries/${id}`);
      const data = await res.json();
      setBreweryData(data);
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="App">
      <div className="App-body">
        <Navigation
          onCityNameSubmit={loadSearchResults}
          onFavoriteSelect={getBrewery}
        />
        <MobileNavigation
          onCityNameSubmit={loadSearchResults}
          onFavoriteSelect={getBrewery}
        />
        <Body
          onCityNameSubmit={loadSearchResults}
          onPageChange={loadSearchResultsOnPageChange}
          onBrewerySelect={getBrewery}
          breweries={breweries}
          brewery={breweryData}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
