import React from 'react';
import './movie.scss';

export const Movie: React.FC<{ id: string, poster: string, title: string }> = (props: { id: string, poster: string, title: string }) => {
    return (
        <li key={props.id}>
             <div className="img-wrapper">
                <img className="img-fluid" id={props.id} src={props.poster} alt={'Poster for ' + props.title}/>
                <div className="overlay">{props.title}</div>    
            </div>
        </li>
    )
}