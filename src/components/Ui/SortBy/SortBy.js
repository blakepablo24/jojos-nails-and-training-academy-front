import React from 'react';
import classes from './SortBy.module.css';

const sortBy = (props) => {
    return(
        <div className={classes.SortBy}>
            <p>Sort By:</p>
            <select
                name="sortBy"
                value={props.sortBy}
                onChange={props.changeHandler}
            >
                <option value={props.options.name}>Name</option>
                <option value={props.options.highLow}>Price: High - Low</option>
                <option value={props.options.lowHigh}>Price: Low - High</option>
            </select>
        </div>
    )
}

export default sortBy