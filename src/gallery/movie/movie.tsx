import React from 'react';
import './movie.scss';

interface MovieProps {
    id: string;
    poster: string;
    title: string;
    onClick: Function;
}

export const Movie: React.FC<MovieProps> = (props: MovieProps) => {
    return (
        <div className="img-wrapper" onClick={() => props.onClick(props.id)}>
            <img className="img-fluid" id={props.id} src={props.poster} alt={'Poster for ' + props.title} />
            <div className="overlay">{props.title}</div>
        </div>
    )
}