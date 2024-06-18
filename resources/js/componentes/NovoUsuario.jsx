import React, { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const NovoUsuario = (props) => {


    return (
        <div className='p-0 m-0'>
            <Modal
                title='Novo Usuário'
                open={props.aberto}
                onCancel={props.handleCancelar}
                onOk={props.handleOk}
                destroyOnClose={true}
                confirmLoading={props.confirmLoading}
            >
                <Form layout='vertical'>
                    <Form.Item
                        label='Nome'
                        name='name'
                        rules={[
                            {required:true, message:'Nome é obrigatório'}
                        ]}
                    >
                        <Input
                            maxLength={255}
                            onChange={e=>{
                                props.usuario.name = e.target.value;
                                props.changeUsuario(props.usuario);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label='e-mail'
                        name='email'
                        rules={[
                            {required:true, message:'E-mail é obrigatório'}
                        ]}
                    >
                        <Input 
                            maxLength={255}
                            type='email'
                            onChange={e=>{
                                props.usuario.email = e.target.value;
                                changeUsuario(usuario);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Senha'
                        name='password'
                        rules={[
                            {required:true, message:'Senha é obrigatório'}
                        ]}
                    >
                        <Input.Password
                            min={8}
                            maxLength={255}
                            onChange={e=>{
                                props.usuario.password = e.target.value;
                                changeUsuario(usuario);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Grupo'
                        name='grupo'
                    >
                        <Select
                            options={props.grupos}
                            onChange={v=>{
                                props.usuario.group_id = v;
                                props.changeUsuario(props.usuario);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Departamento'
                        name='departamento'
                    >
                        <Select
                            options={props.departamentos}
                            onChange={v=>{
                                props.usuario.departament_id = v;
                                props.changeUsuario(props.usuario);
                            }}  
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default NovoUsuario;