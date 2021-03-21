import React, { useEffect, useReducer, useState } from 'react';
import { Movie } from './movie/movie';
import { Filter } from './filter/filter';
import { DetailsModal } from './details-modal/details-modal';
import './gallery.scss';

interface Movie {
    id: string;
    poster: string;
    title: string;
}

type State = {
    error: { message: string } | null;
    isLoaded: boolean;
    stable: Movie[];
};

type Action =
    | { type: 'loading' }
    | { type: 'success', payload: Movie[] }
    | { type: 'error', payload: { message: string } };

export const Gallery: React.FC<{}> = () => {

    const initialState: State = {
        error: null,
        isLoaded: false,
        stable: []
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
                    stable: action.payload
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
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [modified, setModified] = useState<Movie[]>([]);
    let modal;

    const handleSelection = (id: string) => {
        setSelectedId(id);
    }

    const handleFilter = (text: string) => {
        setModified(state.stable.filter((item: Movie) => {
            return item.title.toLowerCase().includes(text.toLowerCase());
        }));
    }

    const closeModal = () => {
        setSelectedId(null);
    }

    async function fetchMovieList(){
        dispatch({type: 'loading'});
        try{
            const response = await fetch('https://gtrtoph0d7.execute-api.us-east-1.amazonaws.com/dev/media');
            const data = await response.json();
            setModified(data);
            dispatch({type: 'success', payload: data});
        } catch (error) {
            dispatch({type: 'error', payload: error});
        }
    }

    useEffect(() => {
        fetchMovieList();
    }, []);

    if (state.error) {
        return <div>Error: {state.error.message}</div>;
    } else if (!state.isLoaded) {
        return <div>Loading...</div>;
    } else {
        if (selectedId) {
            modal = <DetailsModal movieId={selectedId} onClick={() => closeModal()} />
        }
        return (
            <div>
                <Filter onChange={(text: string) => handleFilter(text)} />
                <ul>
                    {modified.map(item => (
                        <li key={item.id}>
                            <Movie id={item.id} poster={item.poster} title={item.title} onClick={(id: string) => handleSelection(id)} />
                        </li>
                    ))}
                </ul>
                {modal}
            </div>
        );

    }
}