import React, { useState, useEffect } from 'react';
import { Modal,  Form, Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';

const {TextArea} = Input;

const EditarChamado = (props) => {
    const [departamentos, setDepartamentos] = useState([]);
    const [categorias, setCategorias] = useState([]);

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

            const getDepartamentos = async ()=> {
                const response = await axios.get('/api/departament');
                const data = await response.data;
                const opcoes = [];
                await data.forEach(categoria => {
                    opcoes.push(
                        {
                            'value':categoria.id,
                            'label':categoria.nome+': '+categoria.descricao
                        }
                    )
                });

                setDepartamentos(opcoes);
            }
            getDepartamentos();
    }
        
    );

    return (
        <div className='p-0 m-0'>
            <Modal title="Editar Chamado"
                open={props.aberto}
                onCancel={props.handleCancelar}
                onOk={props.handleOk}
                destroyOnClose={true}
                confirmLoading={props.confirmLoading}
                width='60vw'
            >
                <Form layout='vertical'>
                <Form.Item 
                            label='Nome Completo'
                            name="nome"
                            rules={[
                                {required:true, message:"Nome é obrigatório"}
                            ]}
                            className='form-text'
                            >
                            <Input placeholder='Nome Completo' alt='nome completo' defaultValue={props.chamado.nome_solicitante} 
                            onChange={e => {
                                props.chamado.nome_solicitante = e.target.value;
                                props.changeChamado(props.chamado);
                            }}/>
                        </Form.Item>

                        <Form.Item
                            label='E-MAIL'
                            name='email'
                            rules={[
                                {required:true, message:'E-MAIL é obrigatório'},
                                {type:'email', message:'Insira um E-MAIL válido'}
                            ]}
                        >
                            <Input placeholder='exemplo@email.com' alt="email válido" defaultValue={props.chamado.email_solicitante}
                                onChange={e => {
                                    props.chamado.email_solicitante = e.target.value;
                                    props.changeChamado(props.chamado);
                                }}/>
                        </Form.Item>

                        <Form.Item
                            label='Telefone'
                            name='telefone'
                            rules={[
                                {required:true, message:'Telefone é obrigatório'}
                            ]}
                        >
                            <Input alt='telefone' defaultValue={props.chamado.telefone_solicitante}
                                onChange={e => {
                                    props.chamado.telefone_solicitante = e.target.value;
                                    props.changeChamado(props.chamado);
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Assunto'
                            name='assunto'
                            rules={[
                                {required:true, message:'Assunto é  é obrigatório'}
                            ]}
                        >
                            <Input alt="assunto" defaultValue={props.chamado.assunto}
                                onChange={e => {
                                    props.chamado.assunto = e.target.value;
                                    props.changeChamado(props.chamado);
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Categoria'
                            name='categoria'
                        >
                            <Select defaultValue={props.chamado.categoria_id} options={categorias}
                                onChange={e => {
                                    props.chamado.categoria_id = e;
                                    props.changeChamado(props.chamado);
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Descrição"
                            name='descricao'
                            rules={[
                                {required:true, message:'Descrição é obrigatório'}
                            ]}
                        >
                            <TextArea rows={8} defaultValue={props.chamado.descricao}
                                onChange={e => {
                                    props.chamado.descricao = e.target.value;
                                    props.changeChamado(props.chamado);
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Horário de atendimento'
                            name='horario_atendimento'
                        >
                            <DatePicker
                                showTime
                                placeholder='Selecione o horário'
                                format="DD/MM/YYYY HH:mm"
                                defaultValue={(props.chamado.horario_atendimento)?dayjs(props.chamado.horario_atendimento, 'YYYY-MM-DD HH:mm:ss'):null}
                                onChange={e => {
                                    props.chamado.horario_atendimento = e.format();
                                    props.changeChamado(props.chamado);
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Local onde o chamado deve ser atendido'
                            name='local'
                        >
                            <Input placeholder='bloco/sala/pavimento/setor' defaultValue={props.chamado.local}
                                onChange={e => {
                                    props.chamado.local = e.target.value;
                                    props.changeChamado(props.chamado);
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name='departamento'
                            label='Departamento'
                            rules={[
                                {required:true, message:'Departamento é obrigatório'}
                            ]}
                        >
                            <Select 
                                placeholder='Selecione o departamento'
                                defaultValue={props.chamado.departament_id}
                                options={departamentos}
                                onChange={e => {
                                    props.chamado.departament_id = e;
                                    props.changeChamado(props.chamado);
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name='prioridade'
                            label='Prioridade'
                        >
                            <Select defaultValue={props.chamado.prioridade} 
                                options={[
                                    {'value':'baixa', 'label':'Baixa'},
                                    {'value':'média', 'label':'Média'},
                                    {'value':'alta', 'label':'Alta'},
                                    {'value':'urgente', 'label':'Urgente'}
                                ]}
                                onChange={e => {
                                    props.chamado.prioridade = e;
                                    props.changeChamado(props.chamado);
                                }}    
                            />
                        </Form.Item>
                </Form>

            </Modal>
        </div>
    );
}


export default EditarChamado;