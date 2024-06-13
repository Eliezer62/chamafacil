import React, { useEffect, useState } from 'react';
import Auth from './Auth';
import '../css/app.css';
import { Form, Input, Select, DatePicker, ConfigProvider, Space, Button } from "antd";
import locale from 'antd/locale/pt_BR';
import dayjs from 'dayjs';

import axios from 'axios';

async function getCategorias(){
    const data = await axios.get('/api/categoria').then(response => {
        return response.data;
    });
    const select = document.getElementsByClassName('categorias');
    let opcoes = [];
    if(!data) return;
    data.forEach(categoria =>{
        opcoes.push(
            {
                'value':categoria.id,
                'label':categoria.nome
            }
        )
    });
    
    return opcoes;
}


const { TextArea } = Input;



function Home()
{
    const [categorias, setCategorias] = useState({});

    useEffect(() => {
        const getCategorias = async () =>
            {
                const response = await axios.get('/api/categoria');
                const data = await response.data;
                const opcoes = [];
                await data.forEach(categoria => {
                    opcoes.push(
                        {
                            'value':categoria.id,
                            'label':categoria.nome
                        }
                    )
                });

                setCategorias(opcoes);
            };
            getCategorias();
    }
        
    );

    return (
        <div className='container p-0 m-0'>
            <nav className='nav-bar'>
                <h3 className='align-center'>Novo chamado - ChamaFácil</h3>
            </nav>
            <div className='d-flex align-items-center justify-content-center align-middle'>

                <div className="formulario d-flex align-items-center justify-content-center align-middle">
                    <Form
                        layout='vertical'
                        size='large'
                        className='w-100 p-4'
                    >
                        <Form.Item>
                            <h5>Preencha os dados abaixo para abrir um chamado</h5>
                        </Form.Item>

                        <Form.Item 
                            label='Nome Completo'
                            name="nome_solicitante"
                            rules={[
                                {required:true, message:"Nome é obrigatório"}
                            ]}
                            className='form-text'
                            >
                            <Input placeholder='Nome Completo' alt='nome completo'/>
                        </Form.Item>

                        <Form.Item
                            label='E-MAIL'
                            name='email_solicitante'
                            rules={[
                                {required:true, message:'E-MAIL é obrigatório'},
                                {type:'email', message:'Insira um E-MAIL válido'}
                            ]}
                        >
                            <Input placeholder='exemplo@email.com' alt="email válido"/>
                        </Form.Item>

                        <Form.Item
                            label='Telefone'
                            name='telefone_solicitante'
                            rules={[
                                {required:true, message:'Telefone é obrigatório'}
                            ]}
                        >
                            <Input alt='telefone'/>
                        </Form.Item>

                        <Form.Item
                            label='Assunto'
                            name='assunto'
                            rules={[
                                {required:true, message:'Assunto é  é obrigatório'}
                            ]}
                        >
                            <Input alt="assunto"/>
                        </Form.Item>

                        <Form.Item
                            label='Categoria'
                            name='categoria_id'
                            rules={[
                                {required:true, message:'Categoria é obrigatório'}
                            ]}
                        >
                            <Select defaultValue={1} options={categorias}/>
                        </Form.Item>

                        <Form.Item
                            label="Descrição"
                            name='descricao'
                            rules={[
                                {required:true, message:'Descrição é obrigatório'}
                            ]}
                        >
                            <TextArea rows={8}/>
                        </Form.Item>

                        <Form.Item
                            label='Horário de atendimento'
                            name='horario_atendimento'
                        >
                            <ConfigProvider
                                locale={locale}
                            >
                                <DatePicker
                                    showTime
                                    placeholder='Selecione o horário'
                                    minDate={dayjs()}
                                />
                            </ConfigProvider>
                        </Form.Item>
                        <Form.Item
                            label='Local onde o chamado deve ser atendido'
                            name='local'
                        >
                            <Input placeholder='bloco/sala/pavimento/setor'/>
                        </Form.Item>
                        <Form.Item
                            name='submit'
                        >
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Enviar
                                </Button>
                                <Button htmlType="button">
                                    Limpar
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Home;