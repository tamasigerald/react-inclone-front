import React, { useContext } from 'react';
import { LoaderContext } from './context/LoaderContext';


export default function Loader() {

    const {isLoading} = useContext(LoaderContext);

    return (
        isLoading && <div className="c-loader">
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}