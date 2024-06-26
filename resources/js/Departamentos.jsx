import React, { useState, useEffect } from 'react';
import LayoutBasico from './LayoutBasico';
import { Button, Space, Table, message } from 'antd';
import axios from 'axios';
import EditarDepartamento from './componentes/EditarDepartamento';
import NovoDepartamento from './componentes/NovoDepartamento';
import Auth from './Auth'


const Departamentos = ()=>{
    const [data, setData] = useState([]);
    const [aberto, setAberto] = useState(false);
    const [nome, setNome] = useState();
    const [descricao, setDescricao] = useState();
    const [uuid, setUUID] = useState();
    const [abertoNovo, setAbertoNovo] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();


    const colunas = [
        {
            title:'Nome',
            dataIndex:'nome',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.nome.localeCompare(b.nome),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title:'Descrição',
            dataIndex:'descricao',
        },
        {
            title:'Ações',
            render:(_, dado)=>(
                <div>
                    <a className='primary' 
                        onClick={()=>{
                            setNome(dado.nome);
                            setDescricao(dado.descricao);
                            setUUID(dado.id);
                            setAberto(true);
                    }}>
                        Editar
                    </a>&nbsp;
                    <a className='primary'
                        onClick={async ()=>{
                            const response = await axios.delete('/api/departament/'+dado.id,
                                {
                                    headers: {'Authorization':'Bearer '+sessionStorage.getItem('accessToken')},
                                }
                            ).catch(error=>{
                                messageApi.error('Erro em remover departamento');
                            });
                            if(response.status == 200) messageApi.success('Removido com sucesso'); 
                            setConfirmLoading(true);
                            setConfirmLoading(false);
                        }}
                    >
                        Remover
                    </a>
                </div>
            )
        }
    ];

    const handleCancelar = () => {
        setAberto(false);
        setAbertoNovo(false);
    }

    const handleOk = async () => {
        setConfirmLoading(true);
        const response = await axios(
            {
                method:'PUT',
                url:'/api/departament/'+uuid,
                headers: {'Authorization':'Bearer '+sessionStorage.getItem('accessToken')},
                data: {
                    nome:nome,
                    descricao: descricao
                }
            }
        ).catch(error=>{
            messageApi.error('Erro em editar departamento');
            setAberto(false);
            setConfirmLoading(false);
        });
        setAberto(false);
        setConfirmLoading(false);
        if(response.status==200) messageApi.success('Departamento editado com sucesso');
    }

    const abrirNovoModal = () => {
        setNome(null);
        setDescricao(null);
        setAbertoNovo(true);
    }


    const handleOkNovo = async () => {
        setConfirmLoading(true);
        const response = await axios({
            method:'POST',
            url:'/api/departament',
            headers: {'Authorization':'Bearer '+sessionStorage.getItem('accessToken')},
            data:{
                nome:nome,
                descricao:descricao
            }
        }).catch(error=>{
            setAbertoNovo(false);
            setConfirmLoading(false);
            messageApi.error('Erro em criar o departamento');
        });
        setAbertoNovo(false);
        setConfirmLoading(false);
        if(response.status==201)messageApi.success('Departamento criado com sucesso');
    }

    useEffect(()=>{
        const getDepartamentos = async() => {
            const response = await axios.get('/api/departament',{
                headers:{
                    'Authorization':'Bearer '+sessionStorage.getItem('accessToken')
                }
            });

            const data = await response.data;
            setData(data);
        }
        getDepartamentos();
    }, [confirmLoading, nome, descricao]);


    return (
        
        <LayoutBasico className='p-0 m-0 w-100' nome="Departamentos">
            <Auth/>
            <div className='row d-flex m-3 float-end'>
                <div className='col'>
                    <Button type="primary" onClick={abrirNovoModal}>Adicionar</Button>
                </div>
            </div>
            <Table 
                columns={colunas}
                dataSource={data}
            />
            <EditarDepartamento 
                aberto={aberto} 
                nome={nome}
                descricao={descricao} 
                handleCancelar={handleCancelar}
                handleOk={handleOk}
                changeNome={setNome}
                changeDescricao={setDescricao}
                confirmLoading={confirmLoading}
            />

            {contextHolder}

            <NovoDepartamento
                aberto={abertoNovo}
                nome={nome}
                descricao={descricao}
                handleCancelar={handleCancelar}
                handleOk={handleOkNovo}
                changeNome={setNome}
                changeDescricao={setDescricao}
                confirmLoading={confirmLoading}
            />
        </LayoutBasico>
    )
}

export default Departamentos;