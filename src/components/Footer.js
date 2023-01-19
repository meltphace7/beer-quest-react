import classes from './Footer.module.css'
import React from 'react'
import BeerIcon from "../assets/beer (1).svg";

const Footer = () => {
    return (
      <div className={classes.footer}>
        <div className={classes["logo-container"]}>
          <img className={classes["beer-icon"]} src={BeerIcon} />
          <h2>BEER-QUEST</h2>
        </div>
        <p>Brock Dallman 2022</p>
      </div>
    );
}

export default Footer
