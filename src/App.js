import React, { useState, useContext } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import MobileNavigation from "./components/MobileNavigation";
import Body from "./components/Body";
import Footer from "./components/Footer";
import BrewContext from "./store/brew-context";

function App() {
  const [breweries, setBreweries] = useState([]);
  const [breweryData, setBreweryData] = useState({});
  const ctx = useContext(BrewContext);
  const storage = localStorage.getItem("favorites");
  if (storage) ctx.favorites = JSON.parse(storage);

  const perPage = 8;
  // GETS LIST OF BREWERIES
  const loadSearchResults = async function (query, page) {
    try {
      const res = await fetch(
        `https://api.openbrewerydb.org/breweries?by_city=${query}&per_page=${perPage}&page=${page}`
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

  console.log(`APP RENDER`);
  return (
    <div className="App">
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
        onBrewerySelect={getBrewery}
        breweries={breweries}
        brewery={breweryData}
      />
      <Footer />
    </div>
  );
}

export default App;
