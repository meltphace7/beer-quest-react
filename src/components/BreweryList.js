import React, { useState, useEffect } from "react";
import classes from "./BreweryList.module.css";
import BreweryListItem from "./BreweryListItem";
import { useDispatch, useSelector } from "react-redux";
import { brewActions } from "../store/brew-slice";

const BreweryList = (props) => {
  const dispatch = useDispatch();

  const currentPage = useSelector((state) => state.brew.currentPage);

  const [page, setPage] = useState(currentPage);
  console.log("slice cur page", currentPage);
  console.log("page state", page);

  useEffect(() => {
    dispatch(brewActions.setPage(page));
  }, [page]);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const getBreweryHandler = function (id) {
    props.breweryID(id);
  };

  const prevPageHandler = function () {
    if (currentPage === 1) {
      return;
    } else {
      setPage((prevstate) => {
        return prevstate - 1;
      });
    }
    window.scrollTo(0, 0);
    props.fetchAfterPageChange();
  };

  const nextPageHandler = function () {
    setPage((prevstate) => {
      return prevstate + 1;
    });
    window.scrollTo(0, 0);
    props.fetchAfterPageChange();
  };

  return (
    <div className={classes["list-container"]}>
      <ul className={classes["brewery-list"]}>
        {props.breweries.map((brewery) => (
          <BreweryListItem
            getBrewery={getBreweryHandler}
            key={brewery.id}
            id={brewery.id}
            name={brewery.name}
            city={brewery.city}
            state={brewery.state}
          />
        ))}
      </ul>
      <div className={classes.pagination}>
        <div className={classes["prev-btn-container"]}>
          {page !== 1 && (
            <button onClick={prevPageHandler} className={classes["prev-page"]}>
              Prev
            </button>
          )}
        </div>
        <h3>Page {page}</h3>
        <button onClick={nextPageHandler} className={classes["next-page"]}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BreweryList;
