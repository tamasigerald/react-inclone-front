import axios from 'axios';
import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';


export default function AddPost() {

    const [ title, setTitle ] = useState('');
    const [ body, setBody ] = useState('');
    const [ photo, setPhoto ] = useState('');

    const { addToast } = useToasts();
    const history = useHistory();

    const path = 'assets/images/default-image.jpg';

    const post = {
        title: title,
        body: body,
        photo: photo
    }

    const config = {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}

    const handleImageError = (el) => {
        el.src = path;
    }

    const handleImageUplaod = (e) => {
        const image = e.target.files[0];
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'inBlog');
        data.append('cloud_name', 'tamasigerald');
        axios.post('https://api.cloudinary.com/v1_1/tamasigerald/image/upload', data)
        .then(function(res) {
            setPhoto(res.data.secure_url);
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_BASE_URL + '/createpost', post, config)
        .then(function(res) {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true });
                setTimeout(() => { history.push('/') }, 1500)
        })
        .catch(function(err) {
            if(err.response) {
                addToast(err.response.data.error, { appearance: 'error', autoDismiss: true });
            }
        })
    }

    return (
        <section className="section section--addpost">
            <header className="section__header section__header--addpost">
                <figure className="section__figure">
                    <img className="section__photo section__photo--addpost" onError={(e) => {handleImageError(e.target)}} src={post.photo || path} alt="test"/>
                </figure>
            </header>
            <article className="section__content section__content--addpost">
                <form className="section__form" onSubmit={(e) => {handleSubmit(e)}}>
                    <input className="section__form__input" type="text" name="title" placeholder="title" onChange={(e) => {setTitle(e.target.value)}}/>
                    <div className="upload">
                        <input className="section__form__input section__form__input--file upload--file" type='file' name="photo" placeholder="photo" onChange={(e) => {handleImageUplaod(e)}}/>
                        <button type="button" className="btn btn--primary btn--file">Upload file</button>
                    </div>
                    <textarea className="section__form__input" type="text" name="body" placeholder="body" onChange={(e) => {setBody(e.target.value)}}/>
                    <button type="submit" className="btn btn--success btn--form">Post</button>
                </form>
            </article>
        </section>
    )
}