import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fixHeight } from '../../fixMobileHeight';




export default function LandingPage() {

    useEffect(fixHeight)

    const history = useHistory();

    const handleClick = (route) => {
        history.push(route);
    }
    return (
        <section className="section section--landing">
            <header className="section__header">
                <h2 className="section__title">Welcome to <span className="section__logo">inBlog</span></h2>
                <h3 className="section__subt">Made for real bloggers</h3>
                <div className="section__btns">
                    <button className="btn btn--primary" onClick={() => {handleClick('/signin')}}>Sign In</button>
                    <button className="btn btn--success" onClick={() => {handleClick('/signup')}}>Sign Up</button>
                </div>
            </header>
        </section>
    )
}