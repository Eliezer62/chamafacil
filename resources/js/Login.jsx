import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Checkbox, Form, Input, Modal } from 'antd'
import { useState } from 'react';
import axios from 'axios';



export default function Login(){
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [modal, contextHolder] = Modal.useModal();

    const erro = {
        title:"Erro login",
        content: (
            <>
                <p>Senha ou e-mail inválido</p>
            </>
        )
    }


    const handleSubmit = async e => {
        if(!email || !password)return;
        setLoading(true);
        const response = await axios({
            method:'POST',
            url:'/api/auth/login',
            data:{
                email:email,
                password:password,
            }
        }).catch(error=>{
            setLoading(false);
            modal.error(erro);
        })
        if(response.status==200)
        {
            const data = await response.data;
            sessionStorage.setItem('accessToken', data.authorisation.token);
            sessionStorage.setItem('user', JSON.stringify(data.user));
            window.location = '/chamados';
        }
    }


    return (

        <div className='row h-100 w-100 login-page'>
            {contextHolder}
            <div className="col-sm-4 login d-flex align-items-center justify-content-center align-middle">
                <Form name="login"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="true"
                >
                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[
                            {
                            required: true,
                            message: 'Digite o seu email',
                            type:"email"
                            },
                        ]}
                    >
                        <Input onChange={e => setEmail(e.target.value)}/>
                    </Form.Item>
                
                    <Form.Item
                        label="Senha"
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Digite sua senha',
                            },
                        ]}
                    >
                        <Input.Password onChange={e => setPassword(e.target.value)}/>
                    </Form.Item>
            
                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        onClick={handleSubmit}
                        loading={loading}
                    >
                    Login
                    </Button>
                </Form.Item>
                </Form>
            </div>
        </div>
    );
}
