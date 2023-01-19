import React, { useContext } from 'react'
import classes from './Body.module.css'
import BreweryList from './BreweryList'
import BreweryFeature from './BreweryFeature'
import BrewContext from '../store/brew-context'

const Body = (props) => {
  const ctx = useContext(BrewContext);

  let city = ctx.query
  const pageChangeHandler = function(page) {
    props.onCityNameSubmit(city, page)
  }

    return (
      <div className={classes.body}>
        <BreweryList
          onPageChange={pageChangeHandler}
          breweryID={props.onBrewerySelect}
          breweries={props.breweries}
        />
        <BreweryFeature breweries={props.breweries} brewery={props.brewery} />
      </div>
    );
}

export default Body
