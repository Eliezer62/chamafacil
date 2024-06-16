import React, { useEffect, useState } from 'react';
import Auth from './Auth';
import '../css/app.css';
import { Form, Input, Select, DatePicker, ConfigProvider, Space, Button, Modal } from "antd";
import locale from 'antd/locale/pt_BR';
import dayjs from 'dayjs';

import axios from 'axios';

const { TextArea } = Input;

function Home()
{
    const [categorias, setCategorias] = useState();
    const [departamentos, setDepartamentos] = useState();
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [telefone, setTelefone] = useState();
    const [assunto, setAssunto] = useState();
    const [categoria, setCategoria] = useState(1);
    const [descricao, setDescricao] = useState();
    const [horario, setHorario] = useState();
    const [local, setLocal] = useState();
    const [departamento, setDepartamento] = useState();
    const [prioridade, setPrioridade] = useState('baixa');
    const [loading, setLoading] = useState(false);
    const [modal, contextHolder] = Modal.useModal();

    //default values

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


    const sucesso = {
        title: 'Sucesso',
        content: (
          <>
            <p>Chamado enviado com sucesso</p>
          </>
        ),
        onOk: ()=>{window.location = '/'}
      };


    const erro = {
        title: 'Erro',
        content: (
            <>
              <p>Erro em enviar chamado, tente novamente</p>
            </>
        ),
    }

    async function enviarChamado()
    {
        setLoading(true);

        if(!!nome && !!email && !!telefone && !!assunto 
            && !!categoria && !!descricao && !!departamento && !!prioridade)
        {
            const chamado = await axios({
                method:'POST',
                url:'/api/chamado',
                headers:{
                    'Authorization':sessionStorage.getItem('accessToken')
                },
                data:{
                    'nome_solicitante':nome,
                    'email_solicitante':email,
                    'telefone_solicitante':telefone,
                    'assunto':assunto,
                    'categoria_id':categoria,
                    'prioridade':prioridade,
                    'descricao':descricao,
                    'local':local,
                    'horario_atendimento':horario,
                    'departament_id':departamento
                }
            }).then(response =>{
                modal.info(sucesso);
            }).catch(error => {
                modal.error(erro);
            });
        }

    }

    return (
        
        <div className='container p-0 m-0' style={{overflowX:'hidden'}}>
            <nav className='nav-bar'>
                <h3 className='align-center'>Novo chamado - ChamaFácil</h3>
                <div className='d-flex mr-4'>
                    <Button color='primary' onClick={()=>{window.location='/chamados'}}>Chamados</Button>
                </div>
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
                            name="nome"
                            rules={[
                                {required:true, message:"Nome é obrigatório"}
                            ]}
                            className='form-text'
                            >
                            <Input placeholder='Nome Completo' alt='nome completo' onChange={e => {setNome(e.target.value)}}/>
                        </Form.Item>

                        <Form.Item
                            label='E-MAIL'
                            name='email'
                            rules={[
                                {required:true, message:'E-MAIL é obrigatório'},
                                {type:'email', message:'Insira um E-MAIL válido'}
                            ]}
                        >
                            <Input placeholder='exemplo@email.com' alt="email válido" onChange={e => {setEmail(e.target.value)}}/>
                        </Form.Item>

                        <Form.Item
                            label='Telefone'
                            name='telefone'
                            rules={[
                                {required:true, message:'Telefone é obrigatório'}
                            ]}
                        >
                            <Input alt='telefone' onChange={e => {setTelefone(e.target.value)}}/>
                        </Form.Item>

                        <Form.Item
                            label='Assunto'
                            name='assunto'
                            rules={[
                                {required:true, message:'Assunto é  é obrigatório'}
                            ]}
                        >
                            <Input alt="assunto" onChange={e => {setAssunto(e.target.value)}}/>
                        </Form.Item>

                        <Form.Item
                            label='Categoria'
                            name='categoria'
                        
                        >
                            <Select defaultValue={1} options={categorias} onChange={(v)=>{setCategoria(v)}}/>
                        </Form.Item>

                        <Form.Item
                            label="Descrição"
                            name='descricao'
                            rules={[
                                {required:true, message:'Descrição é obrigatório'}
                            ]}
                        >
                            <TextArea rows={8} onChange={e => {setDescricao(e.target.value)}}/>
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
                                    onChange={e =>setHorario(e.format())}
                                    format="DD/MM/YYYY HH:mm"
                                />
                            </ConfigProvider>
                        </Form.Item>
                        <Form.Item
                            label='Local onde o chamado deve ser atendido'
                            name='local'
                        >
                            <Input placeholder='bloco/sala/pavimento/setor' onChange={e=>{setLocal(e.target.value)}}/>
                        </Form.Item>

                        <Form.Item
                            name='departamento'
                            label='Departamento'
                            rules={[
                                {required:true, message:'Departamento é obrigatório'}
                            ]}
                        >
                            <Select 
                            options={departamentos}
                            placeholder='Selecione o departamento'
                            onChange={(v)=>{setDepartamento(v)}}
                            />
                        </Form.Item>

                        <Form.Item
                            name='prioridade'
                            label='Prioridade'
                        >
                            <Select defaultValue={'baixa'} options={[
                                {'value':'baixa', 'label':'Baixa'},
                                {'value':'média', 'label':'Média'},
                                {'value':'alta', 'label':'Alta'},
                                {'value':'urgente', 'label':'Urgente'}
                                ]} onChange={v=>{setPrioridade(v)}}/>
                        </Form.Item>

                        <Form.Item
                            name='submit'
                        >
                            <Space>
                                {contextHolder}
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    onClick={enviarChamado} 
                                    id="submit"
                                    loading={loading}
                                >
                                    Enviar
                                </Button>
                                <Button htmlType="button" onClick={()=>{window.location='/'}}>
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