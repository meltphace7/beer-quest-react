import React, { useState, useEffect } from 'react'
import classes from './BreweryList.module.css'
import BreweryListItem from './BreweryListItem'
import { useDispatch, useSelector } from 'react-redux';
import {brewActions} from '../store/brew-slice'

const BreweryList = (props) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  //
  useEffect(() => {
    props.onPageChange(page);
  }, [page])

  console.log('pagination', page)
  
  //

const getBreweryHandler = function(id) {
  props.breweryID(id)
}

const prevPageHandler = function() {
  if (page === 1) {
    return;
  } else {
    setPage((prevstate) => {
      return prevstate - 1;
    });
  }
}

const nextPageHandler = function() {
  setPage((prevstate) => {
    return prevstate + 1;
  });
}
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
              <button
                onClick={prevPageHandler}
                className={classes["prev-page"]}
              >
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
}

export default BreweryList
