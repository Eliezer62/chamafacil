import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Checkbox, Form, Input } from 'antd'
import { useState } from 'react';


const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

async function loginJWT(credentials)
{
    return fetch('http://127.0.0.1:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then(data => data.json());
}


export default function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginJWT({
          email,
          password
        });
        if("authorisation" in response)
        {
            sessionStorage.setItem('accessToken', response['authorisation']['token']);
            sessionStorage.setItem('user', JSON.stringify(response['user']));
            window.location = '/';
        }
    }

    return (

        <div className='row h-100 w-100 login-page'>
            <div className="col-sm-4 login d-flex align-items-center justify-content-center align-middle">
                <Form name="basic"
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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
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
                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                    Login
                    </Button>
                </Form.Item>
                </Form>
            </div>
        </div>
    );
}
