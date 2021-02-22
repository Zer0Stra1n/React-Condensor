import React from 'react';
import { Movie } from './movie/movie';
import './gallary.scss';
import { Filter } from './filter/filter';

interface Movie {
    id: string;
    poster: string;
    title: string;
}

interface GallaryState {
    error: string | null;
    isLoaded: boolean;
    stable: Movie[];
    modified: Movie[];
    selectedId: string | null;
}

export class Gallery extends React.Component<{}, GallaryState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            stable: [],
            modified: [],
            selectedId: null,
        }
    }

    componentDidMount() {
        fetch('https://gtrtoph0d7.execute-api.us-east-1.amazonaws.com/dev/media')
            .then(res => res.json())
            .then((result: Movie[]) => {
                this.setState({
                    isLoaded: true,
                    stable: result,
                    modified: result
                });
            }, error => {
                this.setState({
                    error: error.message,
                    isLoaded: true
                })
            }
            )
    }

    handleSelection(id: string) {
        this.setState({selectedId: id});
    }

    handleFilter(text: string) {
        this.setState({
            modified: this.state.stable.filter((item: Movie) => {
                return item.title.toLowerCase().includes(text.toLowerCase());
            })
        })
    }

    render() {
        const { error, isLoaded, modified } = this.state
        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <Filter onChange={(text: string) => this.handleFilter(text)}/>
                    <ul>
                        {modified.map(item => (
                            <li key={item.id}>
                                <Movie id={item.id} poster={item.poster} title={item.title} onClick={(id: string) => this.handleSelection(id)}/>
                            </li>
                        ))}
                    </ul>
                </div>

            );
        }
    }
}