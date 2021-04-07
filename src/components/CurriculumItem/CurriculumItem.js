import React from 'react';
import classes from './CurriculumItem.module.css';

const curriculum = (props) => (
    <div className={classes.CurriculumItem}>
        <h4>-</h4>
        <h4>{props.curriculumItem}</h4>
    </div>
)

export default curriculum