import React, { useState } from 'react';
import { Modal,  Form, Input } from 'antd';
import axios from 'axios';

const NovoDepartamento = (props) => {

    return (
        <div className='p-0 m-0'>
            <Modal title='Novo departamento' 
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
                            maxLength={255} 
                            onChange={e => (props.changeNome(e.target.value))}/>
                    </Form.Item>

                    <Form.Item
                        label="Descrição"
                        name='descricao'
                    >
                        <Input 
                            maxLength={255}
                            onChange={e =>(props.changeDescricao(e.target.value))}
                        />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
}


export default NovoDepartamento;