import React, { useEffect, useState } from 'react';
import LayoutBasico from './LayoutBasico';
import { Table, Button, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import EditarChamado from './componentes/EditarChamado';
import NovoChamado from './componentes/NovoChamado';
import Auth from './Auth';

const Chamados = () => {
    const [data, setData] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [chamado, setChamado] = useState({});
    const [editarAberto, setEditarAberto] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [novoAberto, setNovoAberto] = useState(false);
    const [update, setUpdate] = useState(false);

    const colunas = [
        {
            title:'Assunto',
            dataIndex:'assunto',
            sorter: (a, b) => a.assunto.localeCompare(b.assunto),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title:'Categoria',
            dataIndex:'categoria',
            filters: [
                {
                    text:'Problema',
                    value: 'Problema'
                },
                {
                    text: 'Sugestão',
                    value: 'Sugestão'
                },
                {
                    text: 'Solicitação',
                    value: 'Solicitação'
                },
                {
                    text: 'Outro',
                    value: 'Outro'
                }
            ]
        },
        {
            title:'Prioridade',
            dataIndex:'prioridade',
            filters: [
                {
                    text:'Baixa',
                    value: 'baixa'
                },
                {
                    text: 'Média',
                    value: 'média'
                },
                {
                    text: 'Alta',
                    value: 'alta'
                },
                {
                    text: 'Urgente',
                    value: 'urgente'
                }
            ]
        },
        {
            title:'Status',
            dataIndex:'status',
            filters: [
                {
                    text:'Aberto',
                    value: 'aberto'
                },
                {
                    text: 'Andamento',
                    value: 'andamento'
                },
                {
                    text: 'Fechado',
                    value: 'fechado'
                }
            ]
        },
        {
            title: 'Data de abertura',
            dataIndex:'created_at',
            render: ((date) =>{
                const data = new Date(Date.parse(date));
                return dayjs(data).format('DD/MM/YYYY HH:MM');
            })
        },
        {
            title:'Atendente',
            dataIndex:'atendente'
        },
        {
            title: 'Ações',
            render:(_, dado)=>(
                <div>
                    <a className='primary'
                        onClick={async ()=> {
                            const user = JSON.parse(sessionStorage.getItem('user'));
                            const response = await axios({
                                method:'POST',
                                url:'/api/chamado/'+dado.id+'/atender',
                                headers: {'Authorization':'Bearer '+sessionStorage.getItem('accessToken')},
                                data:{
                                    suporte_id:user.id
                                }
                            }).catch(error =>{
                                messageApi.error('Erro em atender chamado');
                            });
                            if(response.status==200) messageApi.success('Chamado atendido com sucesso');
                            setUpdate(!update);
                        }}
                    >
                        Atender
                    </a>&nbsp;
                    <a className='primary' 
                        onClick={()=>{
                            setChamado(dado);
                            setEditarAberto(true);
                    }}>
                        Editar
                    </a>&nbsp;
                    <a className='primary'
                        onClick={async ()=>{
                            const response = await axios.delete('/api/chamado/'+dado.id,
                                {
                                    headers: {'Authorization':'Bearer '+sessionStorage.getItem('accessToken')},
                                }
                            ).catch(error => {
                                messageApi.error('Erro em remover chamado');
                            });
                            if(await response.status == 200) messageApi.success('Chamado removido com sucesso');
                            setUpdate(!update);
                        }}
                    >
                        Remover
                    </a>
                    <br/>
                    <a className='primary'
                        onClick={async()=>{
                            const response = await axios.get('/api/chamado/'+dado.id+'/fechar',{
                                headers: {'Authorization':'Bearer '+sessionStorage.getItem('accessToken')},
                            }).catch(error => {messageApi.error('Erro em fechar o chamado')});
                            if(await response.status == 200) messageApi.success('Chamado fechado com sucesso');
                            setUpdate(!update);
                        }}
                    >
                            Fechar
                    </a>
                </div>)
        }
    ]

    useEffect(()=>{
        const getChamados = async() => {
            const response = await axios.get('/api/chamado',{
                headers:{
                    'Authorization':'Bearer '+sessionStorage.getItem('accessToken')
                }
            });

            const data = await response.data;
            data.forEach(chamado => {
                chamado.categoria = chamado.categoria.nome;
                if(chamado.atendente)chamado.atendente = chamado.atendente.name;
            });
            setData(data);
        }
        getChamados();
    }, [confirmLoading, update]);

    const handleOk = async () => {
        setConfirmLoading(true);
        const response = await axios({
            method:'PUT',
            url:'/api/chamado/'+chamado.id,
            headers: {'Authorization':'Bearer '+sessionStorage.getItem('accessToken')},
            data:chamado
        }).catch(error => {
            setEditarAberto(false);
            setConfirmLoading(false);
            messageApi.error('Erro em editar o chamado');
        });
        setEditarAberto(false);
        setConfirmLoading(false);
        if(response.status==200) messageApi.success('Chamado editado com sucesso'); 
    }


    const handleCancelar = () => {
        setEditarAberto(false);
        setNovoAberto(false);
    }


    const handleEnviar = async () => {
        console.log(chamado);
        setConfirmLoading(true);
        const response = await axios({
            method:'POST',
            url:'/api/chamado',
            headers: {'Authorization':'Bearer '+sessionStorage.getItem('accessToken')},
            data:chamado
        }).catch(error => {
            setNovoAberto(false);
            setConfirmLoading(false);
            messageApi.error('Erro em criar o chamado');
        });
        if(response.status == 201) messageApi.success('Chamado criado com sucesso');
        setNovoAberto(false);
        setConfirmLoading(false);
    }

    return (
        <LayoutBasico className='p-0 m-0 w-100' nome="Chamados">
            <Auth/>
            <div className='row d-flex m-3 float-end'>
                <div className='col'>
                    <Button type="primary"
                        onClick={()=>{
                            setChamado({});
                            setNovoAberto(true);
                        }}
                    >Adicionar</Button>
                </div>
            </div>
            <Table 
                columns={colunas}
                dataSource={data}
            />
            {contextHolder}
            <EditarChamado
                aberto={editarAberto}
                chamado={chamado}
                handleCancelar={handleCancelar}
                changeChamado={setChamado}
                handleOk={handleOk}
                confirmLoading={confirmLoading}
            />

            <NovoChamado
                aberto={novoAberto}
                chamado={chamado}
                handleCancelar={handleCancelar}
                handleOk={handleEnviar}
                changeChamado={setChamado}
                confirmLoading={confirmLoading}
            />
        </LayoutBasico>
    );
};

export default Chamados;