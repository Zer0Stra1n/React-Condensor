import React from 'react';
import ReactDOM from 'react-dom';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';
import { Gallery } from './gallery/gallary';
import './styles/main.scss';
import './index.scss';

export const App: React.FC<{}> = () => {
    return (
        <div className="app">
            <Header title="React Consdensor" />
            <main className="container">
                <Gallery />
            </main>
            <Footer />
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('root'));

