import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../../shared/components/PostCard'
import { LoaderContext } from '../../core/components/Loader/context/LoaderContext';

export default function HomePage() {

    const [ posts, setPosts ] = useState([]);

    const {setIsLoading} = useContext(LoaderContext);

    const getPosts = () => {
        setIsLoading(true)
        axios.get(process.env.REACT_APP_BASE_URL + '/allposts')
        .then(function(res) {
            setPosts(res.data.posts);
            setIsLoading(false);
        })
    }

    useEffect(getPosts, []);

    return (
        <section className="section section--home">
            <header className="section__header">
                <h1 className="c-card__title">All posts</h1>
            </header>
            <article className="section__content">
                {posts.map((post, i) => <PostCard key={i} post={post} /> )}
            </article>
        </section>
    )
}