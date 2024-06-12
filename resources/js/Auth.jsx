import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function Auth()
{
    const token = sessionStorage.getItem('accessToken');
    
    const auth = ( token != null ) ? true : null ;

    if(auth==null)return <Navigate to="/login" />;

    // alterar para verificar se está logado
    const valido = true;
    if(valido)
        return <Outlet />;
    else
        return <Navigate to="/login" />;
}