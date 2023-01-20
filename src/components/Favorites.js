import React, { useContext } from 'react'
import classes from './Favorites.module.css'
import FavoritesListItem from './FavoritesListItem';
import { useSelector } from 'react-redux';
// import BrewContext from '../store/brew-context'

const Favorites = (props) => {
  const favorites = useSelector(state => state.brew.favorites);
  // const ctx = useContext(BrewContext)

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
