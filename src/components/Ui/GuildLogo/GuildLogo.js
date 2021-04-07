import React from 'react';
import classes from './GuildLogo.module.css';
import Logo from './guild-of-beauty-therapists.png';

const guildLogo = () => (
    <div className={classes.GuildLogo}>
        <img src={Logo} alt="" />
    </div>
)

export default guildLogo