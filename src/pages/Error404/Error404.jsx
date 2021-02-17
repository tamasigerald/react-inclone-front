import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Error404() {

    const history = useHistory();

    const handleClick = (route) => {
        history.push(route);
    }

    return (
        <section className="section section--error">
            <header className="section__header">
                <h2 className="section__title">Welcome to <span className="section__logo">inBlog</span></h2>
                <h3 className="section__subt">Made for real bloggers</h3>
                <p className="section__text">The page you are trying to reach was not found! Please, visit home page!</p>
                <div className="section__btns">
                    <button className="btn btn--primary" onClick={() => {handleClick('/')}}>Home</button>
                </div>
            </header>
        </section>
    )
}