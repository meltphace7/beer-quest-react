import React from 'react'
import classes from './Body.module.css'
import BreweryList from './BreweryList'
import BreweryFeature from './BreweryFeature'

const Body = (props) => {


    return (
      <div className={classes.body}>
        <BreweryList
          breweryID={props.onBrewerySelect}
          breweries={props.breweries}
          fetchAfterPageChange={props.fetchAfterPageChange}
        />
        <BreweryFeature breweries={props.breweries} brewery={props.brewery} />
      </div>
    );
}

export default Body
