import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';
import { useToast } from '../components/ui/use-toast';
import Loader from '../components/ui/Loader';

interface IProps {
    children: ReactNode;
}

const PrivateRoute = ({children}: IProps) => {
    const { toast } = useToast();
    const { pathname } = useLocation()
    const {user, isLoading} = useAppSelector(state => state.user)

    if(isLoading){
        return <Loader />
    }

    if(!user.email && !isLoading){
        toast({
            variant: "destructive",
            duration: 3000,
            description: "Please login first"
        })
        return <Navigate to={'/login'} state={{path: pathname}}/>
    }
    return children
};

export default PrivateRoute;