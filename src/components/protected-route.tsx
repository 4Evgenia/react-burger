import { Redirect, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../services/actions/auth';
import { useEffect, useState } from 'react';
import { ROUTES } from '../models/constants';

export function ProtectedRoute({children, ...rest }:any){
    const {  user } = useSelector((state:any) => state.auth);
    const [isUserLoaded, setUserLoaded] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(getUser());
        setUserLoaded(true);
    }, [dispatch])

    if (!isUserLoaded){
        return null;
    }

    return(
        <Route {...rest} render={() => user ? (children) : 
                                                                    (<Redirect to={{ pathname: ROUTES.Login.path, search: '?redirectUrl=' + location.pathname }} />)} />
    )
}