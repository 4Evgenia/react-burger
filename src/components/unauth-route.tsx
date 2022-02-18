import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/types/hooks';
import { getUser } from '../services/actions/auth';
import { FC, useEffect, useState } from 'react';
import { ROUTES } from '../models/constants';
import { ifPathMatch } from '../utils/url-utils';
import { Location } from 'history';

export const UnauthRoute: FC<RouteProps> = ({ children, ...rest }) => {
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

    const locationFrom = location.search.indexOf('?redirectUrl=') >= 0 ? location.search.split('?redirectUrl=')[1] : ROUTES.Home.path;

    return (
        <Route {...rest} render={() => !user ? (children) : (<Redirect to={{ pathname: ifPathMatch(locationFrom) ? locationFrom : ROUTES.Home.path }} />)} />
    )
}