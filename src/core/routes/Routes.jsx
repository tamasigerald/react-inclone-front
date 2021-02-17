import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import UserPage from '../../pages/UserPage/UserPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import AddPost from '../../pages/AddPost/AddPost';
import Following from '../../pages/Following/Following';
import Error404 from '../../pages/Error404/Error404';
import { IsLoggedContext } from '../../shared/contexts/IsLoggedContext';

export default function Routes() {

    const { isLogged } = useContext(IsLoggedContext);
    return (
        <Switch>
            <Route path="/following">
                { !isLogged ? <LandingPage /> : <Following />}
            </Route>
            <Route path="/addpost">
                { !isLogged ? <LandingPage /> : <AddPost />}
            </Route>
            <Route path="/signup">
                <SignUpPage />
            </Route>
            <Route path="/signin">
                <SignInPage />
            </Route>
            <Route path="/me">
                { !isLogged ? <LandingPage /> : <UserPage />}
            </Route>
            <Route exact path="/">
                { isLogged ? <HomePage /> : <LandingPage />}
            </Route>
            <Route>
                <Error404 />
            </Route>
        </Switch>
    )
}