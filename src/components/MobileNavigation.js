import React from "react";
import classes from "./MobileNavigation.module.css";
import { useState, useContext } from "react";
import Favorites from "./Favorites";
import BeerIcon from "../assets/beer (1).svg";
import StarIcon from "../assets/star.svg";

const MobileNavigation = (props) => {
  // const ctx = useContext(BrewContext);

  const [enteredCity, setEnteredCity] = useState("");
  const [showBookmarks, setShowBookmarks] = useState(false);
  // ctx.query = enteredCity;

  const onChangeHandler = function(e) {
    setEnteredCity(e.target.value);
  };

  const toggleBookmarksHandler = () => {
    setShowBookmarks((prevstate) => !prevstate);
  };

  const submitHandler = function(e) {
    e.preventDefault();
    props.onCityNameSubmit(enteredCity);
  };

  const getBrewery = function(id) {
    props.onFavoriteSelect(id);
  };

  const favoritesClasses = showBookmarks
    ? classes["favorites-container"]
    : `${classes["favorites-container"]} ${classes["hidden"]}`;

  return (
    <nav className={classes.nav}>
      <div className={classes["nav-search"]}>
        <div className={classes["logo-container"]}>
          <img className={classes["beer-icon"]} src={BeerIcon} />
          <h2>BEER-QUEST</h2>
        </div>
        <form className={classes["search-form"]} onSubmit={submitHandler}>
          <input
            className={classes["city-input"]}
            value={enteredCity}
            onChange={onChangeHandler}
            type="text"
            id="city"
            placeholder="Enter City!"
          />
          <button className={classes["city-input-btn"]}>Find Breweries!</button>
        </form>
      </div>

      <div
        onClick={toggleBookmarksHandler}
        className={classes["favorites-logo-container"]}
      >
        <img className={classes["star-icon"]} src={StarIcon} />
        <h2 className={classes["favorites-title"]}>FAVORITES</h2>
      </div>
      <div className={favoritesClasses}>
        <Favorites
          onBrewerySelect={toggleBookmarksHandler}
          breweryID={getBrewery}
        />
      </div>
    </nav>
  );
};

export default MobileNavigation;
