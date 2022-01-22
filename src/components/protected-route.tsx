import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../services/actions/auth';
import { useEffect } from 'react';
import { ROUTES } from '../models/constants';

export function ProtectedRoute({children, ...rest }:any){
    const { getUserSuccess, user } = useSelector((state:any) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])

    return(
        <Route {...rest} render={({ location }) => getUserSuccess && user ? (children) : 
                                                                    (<Redirect to={{ pathname: ROUTES.Login.path, state: { from: location } }} />)} />
    )
}