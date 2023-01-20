import React from 'react'
import classes from './Favorites.module.css'
import FavoritesListItem from './FavoritesListItem';
import { useSelector } from 'react-redux';

const Favorites = (props) => {
  const favorites = useSelector(state => state.brew.favorites);

  const getBreweryHandler = function(id) {
    props.breweryID(id)
  }

  const closeMenuHandler = () => {
    props.onBrewerySelect()
    console.log('click')
  }

    return (
        <ul className={classes['favorites-list']}>
          {favorites.map(brewery => (
            <FavoritesListItem
              closeMenu={closeMenuHandler}
              getBrewery={getBreweryHandler} 
              id={brewery.id}
              key={brewery.id}
              name={brewery.name}
              city={brewery.city}
              state={brewery.state}
              />
          ))}
        </ul>
    )
}

export default Favorites
