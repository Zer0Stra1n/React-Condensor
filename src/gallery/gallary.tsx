import React from 'react';
import { Movie } from './movie/movie';
import './gallary.scss';

interface Movie {
    id: string;
    poster: string;
    title: string;
}

interface GallaryState {
    error: string | null;
    isLoaded: boolean;
    items: Movie[];
}

export class Gallery extends React.Component<{}, GallaryState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        }
    }

    componentDidMount() {
        fetch('https://gtrtoph0d7.execute-api.us-east-1.amazonaws.com/dev/media')
            .then(res => res.json())
            .then((result: Movie[]) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            }, error => {
                this.setState({
                    error: error.message,
                    isLoaded: true
                })
            }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state
        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>
                        <input type="text"></input>
                    </div>
                    <ul>
                        {items.map(item => (
                            <Movie id={item.id} poster={item.poster} title={item.title}/>
                        ))}
                    </ul>
                </div>

            );
        }
    }
}