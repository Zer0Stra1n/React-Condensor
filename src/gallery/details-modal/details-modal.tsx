import React, { useEffect, useState } from 'react';
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

export const DetailsModal: React.FC<{ movieId: string, onClick: Function }> = (props: { movieId: string, onClick: Function }) => {
    const [movie, setMovie] = useState<MovieDetails>();
    const [error, setError] = useState<{message: string} | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const url = `https://gtrtoph0d7.execute-api.us-east-1.amazonaws.com/dev/media/${props.movieId}`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then((result: MovieDetails) => {
                setMovie(result);
                setIsLoaded(true);
            }, (error) => {
                setError(error);
                setIsLoaded(true);
            })
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div className="modal fade show" id={props.movieId} tabIndex={-1} role="dialog" aria-labelledby={movie?.title}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{movie?.title}</h5>
                            <button type="button" className="close" onClick={() => props.onClick()} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <iframe src={movie?.trailer} frameBorder="0" allowFullScreen></iframe>
                            <div className="plot">
                                <div className="heading">Synopsis:</div>
                                <div>{movie?.plot}</div>
                            </div>
                            <div className="info">
                                <div>
                                    <span>Rating:</span><span>{movie?.rated}</span>
                                </div>
                                <div>
                                    <span>Director:</span><span>{movie?.director}</span>
                                </div>
                                <div>
                                    <span>Writer:</span><span>{movie?.writer}</span>
                                </div>
                                <div>
                                    <span>Actors:</span><span>{movie?.actors}</span>
                                </div>
                                <div>
                                    <span>Awards:</span><span>{movie?.awards}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}