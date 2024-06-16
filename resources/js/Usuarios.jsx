import React, { useEffect, useState } from 'react';
import { Button, Table, message } from 'antd';
import LayoutBasico from './LayoutBasico';
import Auth from'./Auth';
import axios from 'axios';
import EditarUsuario from './componentes/EditarUsuario';
import NovoUsuario from './componentes/NovoUsuario';
import Password from 'antd/es/input/Password';


const Usuarios = () => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [mensagemAPI, contextHolder] = message.useMessage();
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [usuario, setusuario] = useState({});
    const [grupos, setGrupos] = useState();
    const [departamentos, setDepartamentos] = useState();
    const [mostrarNovo, setMostrarNovo] = useState(false);

    const colunas = [
        {
            title:'Nome',
            dataIndex:'name',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.nome.localeCompare(b.nome),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title:'e-mail',
            dataIndex:'email',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.email.localeCompare(b.email),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title:'Departamento',
            dataIndex:'departamento'
        },
        {
            title:'Grupo',
            dataIndex:'grupo'
        },
        {
            title:'Ações',
            render: (_, dado) => (
                <>
                    <a className='primary' 
                        onClick={()=>{
                            setMostrarEditar(true);
                            setusuario(dado);
                        }}>Editar</a>&nbsp;
                    <a className='primary'
                        onClick={async ()=>{
                            mensagemAPI.loading('Removendo usuário');
                            const response = await axios.delete('/api/user/'+dado.id,{
                                headers: {'Authorization':'Bearer '+sessionStorage.getItem('accessToken')},
                            }).catch( error=>{
                                mensagemAPI.error('Não foi possível remover o usuário');
                            });
                            mensagemAPI.destroy();
                            mensagemAPI.success('Usuário apagado com sucesso');
                        }}
                    >Remover</a>
                </>
            )
        }
    ]

    useEffect( () => {
        const getUsuarios = async() => {
            const response = await axios.get('/api/user', {
                headers: {'Authorization':'Bearer '+sessionStorage.getItem('accessToken')},
            });
            const data = await response.data;
            data.forEach(usuario => {
                usuario.departamento = usuario.departament.nome;
                usuario.grupo = usuario.group.nome;
            });
            setUsuarios(await data);
            setLoadingTable(false);
        }
        getUsuarios();

        const getGrupos = async() => {
            const response = await axios.get('/api/group', {
                headers: {'Authorization':'Bearer '+sessionStorage.getItem('accessToken')},
            })
            const data = await response.data;
            const opcoes = [];
            await data.forEach(grupo => {
                opcoes.push(
                    {
                        'value':grupo.id,
                        'label':grupo.nome+': '+grupo.descricao
                    }
                )
            });
            setGrupos(opcoes);
        }
        getGrupos();

        const getDepartamentos = async() => {
            const response = await axios.get('/api/departament');
            const data = await response.data;
            const opcoes = [];
            await data.forEach(departamento => {
                opcoes.push(
                    {
                        'value':departamento.id,
                        'label':departamento.nome+': '+departamento.descricao
                    }
                )
            });
            setDepartamentos(opcoes);
        }
        getDepartamentos();
    });


    const handleCancelar = () => {
        setMostrarEditar(false);
        setMostrarNovo(false);
    }


    const handleOk = async () =>{
        setConfirmLoading(true);
        console.log(usuario);
        const response = await axios({
            method:'PUT',
            url:'/api/user/'+usuario.id,
            headers:{
                'Authorization':'Bearer '+sessionStorage.getItem('accessToken')
            },
            data:{
                name:usuario.name,
                email:usuario.email,
                departament_id:usuario.departament_id,
                group:usuario.group_id
            }
        }).catch( (error)=>{
            setConfirmLoading(false);
            setMostrarEditar(false);
            mensagemAPI.error('Não foi possível atualizar o usuário');
        });
        if(await response.status==200)mensagemAPI.success('Usuário atualizado com sucesso');
        setMostrarEditar(false);
        setConfirmLoading(false);
    }


    const salvarUsuario = async() => {
        setConfirmLoading(true);
        const data = {
            name:usuario.name,
            email:usuario.email,
            departament_id:usuario.departament_id,
            group_id:usuario.group_id,
            password:'senha1234'
        }

        const response = await axios({
            method:'POST',
            url:'api/user',
            headers:{
                'Authorization':'Bearer '+sessionStorage.getItem('accessToken')
            },
            data:data
        }).catch((error)=>{
            setConfirmLoading(false);
            setMostrarNovo(false);
            mensagemAPI.error('Não foi possível salvar o usuário');
        });
        setMostrarNovo(false);
        setConfirmLoading(false);
        if(response.status==200)mensagemAPI.success('Usuário salvo com sucesso');
    }

    return (
        <LayoutBasico className='p-0 m-0 w-100' nome="Usuários">
            <Auth/>
            <div className='row d-flex m-3 float-end'>
                <div className='col'>
                    <Button type="primary" onClick={()=>{setMostrarNovo(true);}}>Adicionar</Button>
                </div>
            </div>
            <Table 
                columns={colunas}
                dataSource={usuarios}
                loading={loadingTable}
            />
            {contextHolder}
            <EditarUsuario
                aberto={mostrarEditar}
                confirmLoading={confirmLoading}
                usuario={usuario}
                handleCancelar={handleCancelar}
                grupos={grupos}
                departamentos={departamentos}
                changeUsuario={setusuario}
                handleOk={handleOk}
            />

            <NovoUsuario
                aberto={mostrarNovo}
                confirmLoading={confirmLoading}
                usuario={usuario}
                handleCancelar={handleCancelar}
                grupos={grupos}
                departamentos={departamentos}
                changeUsuario={setusuario}
                handleOk={salvarUsuario}
            />
        </LayoutBasico>
    );
};


export default Usuarios;