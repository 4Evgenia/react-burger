import { Redirect, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../services/actions/auth';
import { useEffect, useState } from 'react';
import { ROUTES } from '../models/constants';
import { ifPathMatch } from '../utils/url-utils';

export function UnauthRoute({children, ...rest }:any){
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
    
    const locationFrom =  location.search.indexOf('?redirectUrl=') >= 0  ? location.search.split('?redirectUrl=')[1] : ROUTES.Home.path;

    return(
        <Route {...rest} render={() => !user ? (children) : (<Redirect to={{ pathname: ifPathMatch(locationFrom) ? locationFrom : ROUTES.Home.path }} />)} />
    )
}