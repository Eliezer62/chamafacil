import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

export default function Auth()
{
    const token = sessionStorage.getItem('accessToken');
    
    const auth = ( token != null ) ? true : null ;


    if(!auth)return <Navigate to="/login" />;

    const validar = async () => {
        const response = await axios.get('/api/auth/check', {
            headers:{
                'Authorization':'Bearer '+token
            }
        });
        if(!response.data.valido) window.location='/login'; 
    }
    validar();
    return <Outlet/>
}