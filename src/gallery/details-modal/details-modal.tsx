import React, { useEffect, useReducer, useState } from 'react';
import './details-modal.scss';

interface MovieDetails {
    title: string;
    trailer: string;
    rated: string;
    vintage: number;
    plot: string;
    director: string;
    writer: string;
    actors: string;
    awards: string;
}

type State = {
    isLoaded: boolean;
    error: { message: string } | null;
    movie: MovieDetails | null;
}

type Action =
    | { type: 'loading' }
    | { type: 'success', payload: MovieDetails }
    | { type: 'error', payload: { message: string } };

export const DetailsModal: React.FC<{ movieId: string, onClick: Function }> = (props: { movieId: string, onClick: Function }) => {
    const initialState: State = {
        isLoaded: false,
        error: null,
        movie: null,
    }

    const stateReducer = (state: State, action: Action) => {
        switch(action.type){
            case 'loading':
                return {
                    ...state,
                    isLoaded: false
                }
            case 'success':
                return {
                    ...state,
                    isLoaded: true,
                    movie: action.payload
                }
            case 'error':
                return {
                    ...state,
                    isLoaded: true,
                    error: action.payload
                }
            default:
                throw new Error('unknown network state');
        }
    }

    const [state, dispatch] = useReducer(stateReducer, initialState);
    const url = `https://gtrtoph0d7.execute-api.us-east-1.amazonaws.com/dev/media/${props.movieId}`;

    async function fetchMovie() {
        dispatch({type: 'loading'});
        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch({type: 'success', payload: data});
        } catch (error) {
            dispatch({type: 'error', payload: error});
        }
    }

    useEffect(() => {
        fetchMovie();
    }, []);

    if (state.error) {
        return <div>Error: {state.error.message}</div>;
      } else if (!state.isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div className="modal fade show" id={props.movieId} tabIndex={-1} role="dialog" aria-labelledby={state.movie?.title}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{state.movie?.title}</h5>
                            <button type="button" className="close" onClick={() => props.onClick()} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <iframe src={state.movie?.trailer} frameBorder="0" allowFullScreen></iframe>
                            <div className="plot">
                                <div className="heading">Synopsis:</div>
                                <div>{state.movie?.plot}</div>
                            </div>
                            <div className="info">
                                <div>
                                    <span>Rating:</span><span>{state.movie?.rated}</span>
                                </div>
                                <div>
                                    <span>Director:</span><span>{state.movie?.director}</span>
                                </div>
                                <div>
                                    <span>Writer:</span><span>{state.movie?.writer}</span>
                                </div>
                                <div>
                                    <span>Actors:</span><span>{state.movie?.actors}</span>
                                </div>
                                <div>
                                    <span>Awards:</span><span>{state.movie?.awards}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}