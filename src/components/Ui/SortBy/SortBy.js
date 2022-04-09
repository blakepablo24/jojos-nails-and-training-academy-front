import React from 'react';
import classes from './SortBy.module.css';

const sortBy = () => {
    return(
        <div className={classes.SortBy}>
            <p>Sort By:</p>
            <select>
                <option value="name">Name</option>
                <option value="high-low">Price: High - Low</option>
                <option value="low-high">Price: Low - High</option>
            </select>
        </div>
    )
}

export default sortBy