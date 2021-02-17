import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { IsLoggedContext } from '../contexts/IsLoggedContext';
import { useLocation } from 'react-router-dom';

export default function PostCard(props) {

    const [ liked, setLiked ] = useState(false);
    const [ numLikes, setNumLikes ] = useState(props.post.likes.length);
    const { loggedUser } = useContext(IsLoggedContext);

    const config = {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}

    const location = useLocation();

    const path = 'assets/images/default-image.jpg';
    const handleImageError = (el) => {
        const path = 'assets/images/default-image.jpg';
        el.setAttribute('src', path);
    }
    
    const checkLiked = () => {
        if (loggedUser) {
            if (props.post.likes.includes(loggedUser._id)) {
                setLiked(true);
            }
        }
    }

    const handleLike = (e, postId) => {
        if (!liked) {
            likePost(postId);
            setLiked(true);
        } else {
            unlikePost(postId);
            setLiked(false);
        }
    }

    const likePost = (postId) => {
        axios.put('/like', {postId: postId}, config)
        .then(function(res) {
            setNumLikes(res.data.likes.length);
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    const unlikePost = (postId) => {
        axios.put('/unlike', {postId: postId}, config)
        .then(function(res) {
            setNumLikes(res.data.likes.length);
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    useEffect(checkLiked, [])
    
    return (
        <div className="c-card">
            <figure className="c-card__figure">
                <img className="c-card__photo" onError={(e) => {handleImageError(e.target)}} src={props.post.photo || path} alt={props.post.title} />
            </figure>

            <div className="c-card__content">
            {location.pathname !== '/me' && <div className="c-card__likes">
                {!liked ? <FaRegHeart className="like" onClick={(e) => {handleLike(e, props.post._id)}} /> :<FaHeart className="like like--active" onClick={(e) => {handleLike(e, props.post._id)}} />}
                <p className="c-card__likes__text">{numLikes} {numLikes === 1 ? 'like' : 'likes'}</p>
            </div>}
                <h2>{props.post.title}</h2>
                <pre className="c-card__body">{props.post.body}</pre>
            </div>
            
        </div>
    )
}