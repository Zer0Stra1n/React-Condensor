import React from 'react';
import { Movie } from './movie/movie';
import { Filter } from './filter/filter';
import { Modal } from './modal/modal';
import './gallery.scss';

interface Movie {
    id: string;
    poster: string;
    title: string;
}

interface GalleryState {
    error: string | null;
    isLoaded: boolean;
    stable: Movie[];
    modified: Movie[];
    selectedId: string | null;
}

export class Gallery extends React.Component<{}, GalleryState> {
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

    closeModal() {
        this.setState({
            selectedId: null
        });
    }

    render() {
        const { error, isLoaded, modified, selectedId } = this.state
        let modal;

        if (error) {
            return <div>Error: {error}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            if (selectedId) {
                modal = <Modal movieId={selectedId} onClick={() => this.closeModal()}></Modal>
            }

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
                    {modal}
                </div>
            );
        }
    }
}