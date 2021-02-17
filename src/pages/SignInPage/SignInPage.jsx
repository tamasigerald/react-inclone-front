import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { IsLoggedContext } from '../../shared/contexts/IsLoggedContext'
import { LoaderContext } from '../../core/components/Loader/context/LoaderContext';
import { fixHeight } from '../../fixMobileHeight';

export default function SignInPage() {

    useEffect(fixHeight);

    const { setIsLogged, setLoggedUser } = useContext(IsLoggedContext);

    const [ email, setEmail] = useState('')
    const [ password, setPass] = useState('')
    
    const { addToast } = useToasts();
    const history = useHistory();

    const user = {
        "email": email,
        "password": password
    }

    const {setIsLoading} = useContext(LoaderContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = user;
        axios.post(process.env.REACT_APP_BASE_URL + '/signin', newUser)
        .then(function(res) {
            setIsLoading(true)
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if (token && token !== '') {
                setIsLogged(true);
                setLoggedUser(JSON.parse(user)); 
                addToast(res.data.message, { appearance: 'success', autoDismiss: true });
                setTimeout(() => { history.push('/'); setIsLoading(false) }, 1500)
            }
        })
        .catch(function(err) {
            if(err.response) {
                addToast(err.response.data.error, { appearance: 'error', autoDismiss: true });
            }
        })   
    }  
    

    return (
        <section className="section section--signin">
            <header className="section__header">
                <h2>SignIn</h2>
            </header>
            <form className="section__form">
            <input className="section__form__input" type="email" placeholder="email" name="email" value={email} onInput={(e) => setEmail(e.target.value)} />
                <input className="section__form__input" type="password" placeholder="password" name="password" value={password} onInput={(e) => setPass(e.target.value)} />
                <button className="btn btn--success btn--form" onClick={handleSubmit}>Sign In</button>
            </form>
        </section>
    )
}