import React from 'react';
import './footer.scss';

export const Footer: React.FC<{}> = () => {
    return (
        <footer className="bg-dark">
            <div className="container">
                <ul className="nav">
                    <li className="nav-item">
                        <div className="copyright">
                            <span className="fas fa-copyright text-light"></span><span>2020</span>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a href="https://github.com/Zer0Stra1n" target="_blank" className="nav-link text-light"><span className="fab fa-github"></span><span className="d-none d-sm-inline">Zer0Stra1n</span></a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}