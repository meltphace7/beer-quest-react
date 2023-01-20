import React, { useState, useEffect} from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import MobileNavigation from "./components/MobileNavigation";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { useSelector, useDispatch } from 'react-redux';
import { brewActions } from './store/brew-slice'

function App() {
  const dispatch = useDispatch();
  const brewQuery = useSelector(state => state.brew.currentQuery);
  const curPage = useSelector((state) => state.brew.currentPage);

  useEffect(() => {
    loadSearchResultsOnPageChange(curPage);
  }, [curPage]);
  
  useEffect(() => {
    const localFaves = JSON.parse(localStorage.getItem("favorites"));
    if (!localFaves) return;
    dispatch(brewActions.setFavorites(localFaves))
  }, [])

  const [breweries, setBreweries] = useState([]);
  const [breweryData, setBreweryData] = useState({});

  // RESULTS PER PAGE
  const perPage = 8;
  // GETS LIST OF BREWERIES
 
  const loadSearchResults = async function () {
    console.log(curPage);
    dispatch(brewActions.setPage(1))
    try {
      const res = await fetch(
        `https://api.openbrewerydb.org/breweries?by_city=${brewQuery}&per_page=${perPage}&page=${1}`
      );
      const data = await res.json();
      setBreweries(data);
    } catch (err) {
      throw err;
    }
  };

   const loadSearchResultsOnPageChange = async function (page) {
     console.log('app fetch', curPage);
     try {
       const res = await fetch(
         `https://api.openbrewerydb.org/breweries?by_city=${brewQuery}&per_page=${perPage}&page=${page}`
       );
       const data = await res.json();
       console.log()
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

  const fetchAfterPageChange = () => {
    loadSearchResultsOnPageChange();
  }

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
          onPageChange={loadSearchResultsOnPageChange}
          onBrewerySelect={getBrewery}
          breweries={breweries}
          brewery={breweryData}
          fetchAfterPageChange={fetchAfterPageChange}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
