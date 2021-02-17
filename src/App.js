import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './core/routes/Routes';
import Header from "./core/components/Header/Header";
import Footer from './core/components/Footer/Footer';
import { ToastProvider } from 'react-toast-notifications';
import { IsLoggedContext } from './shared/contexts/IsLoggedContext';
import { useEffect, useState } from 'react';
import Loader from './core/components/Loader/Loader';
import { LoaderContext } from './core/components/Loader/context/LoaderContext';



function App() {
  const [ isLogged, setIsLogged ] = useState(false);
  const [ loggedUser, setLoggedUser ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const checkLoggedState = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && token !== '') {
      setIsLogged(true); 
      setLoggedUser(JSON.parse(user)); 
    }
  }
  useEffect(checkLoggedState, []);
  return (
    <Router>
      <IsLoggedContext.Provider value={{isLogged, setIsLogged, loggedUser, setLoggedUser}}>
        <LoaderContext.Provider value={{isLoading, setIsLoading}}>
          <Header />
          <Loader />
          <ToastProvider>
            <Routes />
          </ToastProvider>
          {isLogged && <Footer />}
        </LoaderContext.Provider>
      </IsLoggedContext.Provider>
    </Router>
  );
}

export default App;
