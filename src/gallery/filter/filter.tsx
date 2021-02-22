import React from 'react';
import './filter.scss';

export const Filter: React.FC<{onChange: Function}> = (props: {onChange: Function}) => {
    return (
        <div className="filter-wrapper">
            <label htmlFor="galleryFilter">Filter Results:</label>
            <input type="text" id="galleryFilter" name="galleryFilter" onChange={(event) => props.onChange(event.target.value)}/>
        </div>
    )
}