import React, { useEffect, useState } from 'react';
import { Movie } from './movie/movie';
import { Filter } from './filter/filter';
import { DetailsModal } from './details-modal/details-modal';
import './gallery.scss';

interface Movie {
    id: string;
    poster: string;
    title: string;
}

export const Gallery: React.FC<{}> = () => {
    const [error, setError] = useState<{ message: string } | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [stable, setStable] = useState<Movie[]>([]);
    const [modified, setModified] = useState<Movie[]>([]);
    let modal;

    const handleSelection = (id: string) => {
        setSelectedId(id);
    }

    const handleFilter = (text: string) => {
        setModified(stable.filter((item: Movie) => {
            return item.title.toLowerCase().includes(text.toLowerCase());
        }));
    }

    const closeModal = () => {
        setSelectedId(null);
    }

    async function fetchMovieList(){
        try{
            const response = await fetch('https://gtrtoph0d7.execute-api.us-east-1.amazonaws.com/dev/media');
            const data = await response.json();
            setStable(data);
            setModified(data);
            setIsLoaded(true);
        } catch (error) {
            setError(error);
            setIsLoaded(true);
        }
    }

    useEffect(() => {
        fetchMovieList();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
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