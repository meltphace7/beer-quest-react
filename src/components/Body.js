import React from 'react'
import classes from './Body.module.css'
import BreweryList from './BreweryList'
import BreweryFeature from './BreweryFeature'

const Body = (props) => {

  const pageChangeHandler = function() {
    props.onCityNameSubmit()
  }

    return (
      <div className={classes.body}>
        <BreweryList
          onPageChange={props.onPageChange}
          breweryID={props.onBrewerySelect}
          breweries={props.breweries}
        />
        <BreweryFeature breweries={props.breweries} brewery={props.brewery} />
      </div>
    );
}

export default Body
