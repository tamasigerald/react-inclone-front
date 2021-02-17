import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom';
import { fixHeight } from '../../fixMobileHeight';

export default function SignUpPage() {

    useEffect(fixHeight)

    const [ name, setName] = useState('')
    const [ email, setEmail] = useState('')
    const [ password, setPass] = useState('')
    
    const { addToast } = useToasts();
    const history = useHistory();

    const user = {
        "name": name,
        "email": email,
        "password": password
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = user;
        axios.post('/signup', newUser)
        .then(function(res) {
                addToast(res.data.message, { appearance: 'success', autoDismiss: true });
                setTimeout(() => { history.push('/signin') }, 1500)
        })
        .catch(function(err) {
            if(err.response) {
                addToast(err.response.data.error, { appearance: 'error', autoDismiss: true });
            }
        })   
    }   

    return (
        <section className="section section--signup">
            <header className="section__header">
                <h2>SignUp</h2>
            </header>
            <form className="section__form">
                <input className="section__form__input" type="text" placeholder="fullname" name="name" value={name} onInput={(e) => setName(e.target.value)} />
                <input className="section__form__input" type="email" placeholder="email" name="email" value={email} onInput={(e) => setEmail(e.target.value)} />
                <input className="section__form__input" type="password" placeholder="password" name="password" value={password} onInput={(e) => setPass(e.target.value)} />
                <button className="btn btn--success btn--form" onClick={handleSubmit}>Sign Up</button>
            </form>
        </section>
    )
}