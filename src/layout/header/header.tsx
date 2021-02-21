import React from "react";
import './header.scss'

export const Header: React.FC<{title: string}> = (props: {title: string}) => {
    return (
        <header>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <span className="navbar-brand mb-0 h1">{props.title}</span>
                </div>
            </nav>
        </header>
    )
}