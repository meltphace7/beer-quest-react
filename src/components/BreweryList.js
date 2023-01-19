import React, { useState, useContext, useEffect } from 'react'
import classes from './BreweryList.module.css'
import BreweryListItem from './BreweryListItem'
import BrewContext from '../store/brew-context'

const BreweryList = (props) => {
  const ctx = useContext(BrewContext)
  const [pageNum, setPageNum] = useState(ctx.page);

  // TEST
  ctx.page = pageNum;
  useEffect(() => {
    setPageNum(1)
  }, [ctx.query])

const getBreweryHandler = function(id) {
  props.breweryID(id)
}


const prevPageHandler = function() {
  if (pageNum === 1) {
    return
  } else {
    ctx.page--
    setPageNum((prevState) => prevState - 1)
    props.onPageChange(ctx.page)
    console.log(ctx);
  }
}

const nextPageHandler = function() {
  ctx.page++;
  // setPageNum(ctx.page);
  setPageNum((prevState) => prevState + 1)
  props.onPageChange(ctx.page)
  console.log(ctx);
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
            {pageNum !== 1 && (
              <button
                onClick={prevPageHandler}
                className={classes["prev-page"]}
              >
                Prev
              </button>
            )}
          </div>
          <h3>Page {pageNum}</h3>
          <button onClick={nextPageHandler} className={classes["next-page"]}>
            Next
          </button>
        </div>
      </div>
    );
}

export default BreweryList
