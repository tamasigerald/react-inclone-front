import React, { useContext, useEffect, useState } from 'react';
import { IsLoggedContext } from '../../shared/contexts/IsLoggedContext';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import PostCard from '../../shared/components/PostCard';
import { LoaderContext } from '../../core/components/Loader/context/LoaderContext';
import { fixHeight } from '../../fixMobileHeight';

export default function UserPage() {

    useEffect(fixHeight)

    const [ userPosts, setUserPosts] = useState([]);

    const { addToast } = useToasts();

    const { loggedUser, setLoggedUser, setIsLogged } = useContext(IsLoggedContext)

    const path = 'assets/images/default-image.jpg';
    const handleImageError = (el) => {
        const path = 'assets/images/default-image.jpg';
        el.setAttribute('src', path);
        console.log('err')
    }

    const handleClick = () => {
        localStorage.clear();
        setIsLogged(false);
        setLoggedUser(null);
        addToast('Signed Out! Bye :)', { appearance: 'info', autoDismiss: true });
    }

    const config = {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}

    const {setIsLoading} = useContext(LoaderContext);

    const getUserPosts = () => {
        setIsLoading(true);
        axios.get('/userposts', config)
        .then(function(res) {
            setUserPosts(res.data.posts);
            setIsLoading(false)
        })
    }

    

    useEffect(getUserPosts, []);

    return (
        <section className="section section--user">
            <header className="section__header section__header--user">
                <h1 className="section__title">{loggedUser.name}</h1>
                <figure className="section__figure">
                <img className="section__photo" onError={(e) => {handleImageError(e.target)}} src={loggedUser.photo || path} alt={loggedUser.name} />
                </figure>
                <button className="btn btn--red btn--form" onClick={handleClick}>Sign Out</button>
            </header>
            {userPosts.length !== 0 && <article className="section__content section__content--user">
                {userPosts.map((post, i) => <PostCard key={i} post={post}/>)}
            </article>}
        </section>
    )
}