import React, { useEffect, useState } from 'react';
import LayoutBasico from './LayoutBasico';
import { Table, Button } from 'antd';
import axios from 'axios';

const colunas = [
    {
        title:'Nome',
        dataIndex:'nome_solicitante',
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.nome_solicitante.localeCompare(b.nome_solicitante),
        sortDirections: ['descend', 'ascend'],
    },
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
        title: 'Ações'
    }
]


const Chamados = () => {
    const [data, setData] = useState([]);

    useEffect(()=>{
        const getChamados = async() => {
            const response = await axios.get('/api/chamado',{
                headers:{
                    'Authorization':'Bearer '+sessionStorage.getItem('accessToken')
                }
            });

            const data = await response.data;
            data.forEach(chamado => {
                chamado.categoria = chamado.categoria.nome
            });
            setData(data);
        }
        getChamados();
    });


    return (
        <LayoutBasico className='p-0 m-0 w-100' nome="Chamados">
            <div className='row d-flex m-3 float-end'>
                <div className='col'>
                    <Button type="primary">Adicionar</Button>
                </div>
            </div>
            <Table 
                columns={colunas}
                dataSource={data}
            />
        </LayoutBasico>
    );
};

export default Chamados;