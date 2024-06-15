import React, { useState } from 'react';
import { Modal,  Form, Input } from 'antd';
import axios from 'axios';

const EditarDepartamento = (props) => {

    return (
        <div className='p-0 m-0'>
            <Modal title='Editar departamento' 
                open={props.aberto} 
                onCancel={props.handleCancelar}
                onOk={props.handleOk}
                destroyOnClose={true}
                confirmLoading={props.confirmLoading}
            >
                <Form
                    layout='vertical'
                >
                    <Form.Item
                        label='Nome'
                        name='nome'
                    >
                        <Input 
                            defaultValue={props.nome} 
                            maxLength={255} 
                            onChange={e => (props.changeNome(e.target.value))}/>
                    </Form.Item>

                    <Form.Item
                        label="Descrição"
                        name='descricao'
                    >
                        <Input 
                            defaultValue={props.descricao}
                            maxLength={255}
                            onChange={e =>(props.changeDescricao(e.target.value))}
                        />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
}


export default EditarDepartamento;