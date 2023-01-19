import React from "react";
import classes from "./FavoritesListItem.module.css";

const FavoritesListItem = (props) => {
  const idHandler = function() {
    props.getBrewery(props.id);
    props.closeMenu();
  };

  return (
    <li onClick={idHandler} className={classes["brewery-list-item"]}>
      <a href={`#${props.id}`}>
        <h3 className={classes["brewery-name"]}>{props.name}</h3>
        <p
          className={classes["brewery-city"]}
        >{`${props.city}, ${props.state}`}</p>
      </a>
    </li>
  );
};

export default FavoritesListItem;
