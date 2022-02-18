import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/types/hooks';
import { getUser } from '../services/actions/auth';
import { useEffect, useState, FC } from 'react';
import { ROUTES } from '../models/constants';
import { Location } from 'history';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const { user } = useSelector(state => state.auth);
    const [isUserLoaded, setUserLoaded] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation<Location>();

    useEffect(() => {
        dispatch(getUser());
        setUserLoaded(true);
    }, [dispatch])

    if (!isUserLoaded) {
        return null;
    }

    return (
        <Route {...rest} render={() => user ? (children) :
            (<Redirect to={{ pathname: ROUTES.Login.path, search: '?redirectUrl=' + location.pathname }} />)} />
    )
}