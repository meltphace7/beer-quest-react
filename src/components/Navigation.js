import React from "react";
import classes from "./Navigation.module.css";
import { useState } from "react";
import Favorites from "./Favorites";
import BeerIcon from "../assets/beer (1).svg";
import StarIcon from "../assets/star.svg";
import { useDispatch } from "react-redux";
import { brewActions } from "../store/brew-slice";

const Navigation = (props) => {
  const dispatch = useDispatch();

  const [enteredCity, setEnteredCity] = useState("");
  const [showBookmarks, setShowBookmarks] = useState(false);

  const onChangeHandler = function (e) {
    setEnteredCity(e.target.value);
    dispatch(brewActions.setQuery(e.target.value));
  };

  const mouseEnterHandler = function () {
    setShowBookmarks(true);
  };

  const mouseOutHandler = function () {
    setShowBookmarks(false);
  };

  const submitHandler = function (e) {
    e.preventDefault();
    props.onCityNameSubmit(enteredCity);
  };

  const getBrewery = function (id) {
    props.onFavoriteSelect(id);
  };

  const toggleBookmarksHandler = () => {
    setShowBookmarks((prevstate) => !prevstate);
  };

  return (
    <nav className={classes.nav}>
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
      <div
        className={classes.menu}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseOutHandler}
      >
        <div className={classes["favorites-logo-container"]}>
          <img className={classes["star-icon"]} src={StarIcon} />
          <h2 className={classes["favorites-title"]}>FAVORITES</h2>
        </div>
        {showBookmarks && (
          <div className={classes["favorites-container"]}>
            <Favorites
              onBrewerySelect={toggleBookmarksHandler}
              breweryID={getBrewery}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
