import React, { useState, useEffect } from 'react'
import classes from './BreweryFeature.module.css'
import StarIcon from '../assets/star.svg';
import { useSelector, useDispatch } from 'react-redux';
import {brewActions} from '../store/brew-slice'

const BreweryFeature = (props) => {
  const userFavorites = useSelector(state => state.brew.favorites);

  const dispatch = useDispatch();

  const [breweryIsDefined, setBreweryIsDefined] = useState(1);
  const [breweryIsFavorited, setBreweryIsFavorited] = useState(false);

  useEffect(() => {
    const localFaves = JSON.parse(localStorage.getItem("favorites"));
    if (!localFaves) return
      const existingFave = localFaves.find(fave => fave.id === props.brewery.id);
    if (existingFave) {
      setBreweryIsFavorited(true);
    }
  }, [])

  useEffect(() => {
    let isFavorite = userFavorites.find(brewery => brewery.id === props.brewery.id);
    if (isFavorite) {
      setBreweryIsFavorited(true)
    } else {
      setBreweryIsFavorited(false)
    }
  }, [props.brewery.id])


  const favoriteHandler = function () {
    let favorites;
    const localFaves = JSON.parse(localStorage.getItem('favorites'));
    if (localFaves) {
      favorites = localFaves
    } else {
      favorites = [];
    }
    const existingFavorite = favorites.find(fave => fave.id === props.brewery.id);
    if (existingFavorite) {
      const updatedFavorites = favorites.filter(fave => fave.id !== props.brewery.id);
      favorites = updatedFavorites;
      setBreweryIsFavorited(false);
    } else {
      favorites.push(props.brewery)
      setBreweryIsFavorited(true)
    }
    console.log(favorites)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    dispatch(brewActions.setFavorites(favorites))
  }

  // window.localStorage.setItem("favorites", JSON.stringify(ctx.favorites));

  useEffect(() => {
    if (props.brewery.id === undefined) {
      setBreweryIsDefined(1);
    } else {
      setBreweryIsDefined(2);
    }
   
  }, [props.brewery.id])
 
  let breweryName;
  if (props.brewery.name === undefined || props.brewery.name === null) {
    breweryName = 'No name available'
  } else {
    breweryName = props.brewery.name
  }

  let postalCode;
  if (props.brewery.postal_code === undefined || props.brewery.postal_code === null) {
    postalCode = 'No postal code available'
  } else {
    postalCode = props.brewery.postal_code.slice(0, 5)
  }

  let address;
  if(props.brewery.street === undefined || props.brewery.street === null) {
    address = 'No Address available'
  } else {
    address = `${props.brewery.street} ${props.brewery.city} ${props.brewery.state}, ${postalCode}`
  }

  let phoneNumber;
  if (props.brewery.phone === undefined || props.brewery.phone === null) {
    phoneNumber = 'No phone number available'
  } else {
    phoneNumber = `Phone: ${props.brewery.phone.slice(0, 3)}-${props.brewery.phone.slice(3, 6)}-${props.brewery.phone.slice(-4)}`
  }

  let website;
  if (props.brewery.website_url === undefined || props.brewery.website_url === null) {
    website = 'No website available'
  } else {
    website = props.brewery.website_url;
  }

  let type;
  if (props.brewery.brewery_type === undefined || props.brewery.brewery_type === null) {
    type = 'Brewery type unavailable'
  } else {
    type = `${props.brewery.brewery_type === 'closed' ? props.brewery.brewery_type : props.brewery.brewery_type + ' ' + 'brewery'}`
  }

    return (
      <div className={classes["brewery-feature"]}>
        {breweryIsDefined === 2 ? (
          <div className={classes["brewery-main"]}>
            <div className={classes["brewery-main-info"]}>
              <div className={classes["star-container"]}>
                {breweryIsFavorited && (
                  <img className={classes["star-icon"]} src={StarIcon} />
                )}
              </div>
              <a href={website}>
                <h1>{breweryName}</h1>
              </a>
              <button
                onClick={favoriteHandler}
                className={classes["favorites-btn"]}
              >
                {!breweryIsFavorited
                  ? "Add To Favorites"
                  : "Remove From Favorites"}
              </button>
              <p>{type}</p>
              <p>{phoneNumber}</p>
              <a
                className={classes["address-link"]}
                href={`https://www.google.com/maps/search/?api=1&query=${address}`}
                target="_blank"
                rel="noreferrer"
              >{`${address}`}</a>
              <a
                className={classes["website"]}
                href={website}
                target="_blank"
                rel="noreferrer"
              >
                {website}
              </a>
            </div>
          </div>
        ) : (
          <p className={classes["default-message"]}>
            Please Search a City, Then Select a Brewery!
          </p>
        )}
      </div>
    );
}

export default BreweryFeature
