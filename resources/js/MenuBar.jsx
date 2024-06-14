import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined, SnippetsOutlined, 
    DatabaseOutlined, UserOutlined
 } from '@ant-design/icons';


const itens_menu = [
    {
        key: 'chamado_menu',
        label: 'Chamados',
        icon: <SnippetsOutlined />,
      },
      {
        key:'departamento_menu',
        label:'Departamento',
        icon:<DatabaseOutlined />,
      },

      {
        key:'user_menu',
        label:'Usuário',
        icon: <UserOutlined />,
      }
]

const MenuBar = () =>
{
    const handleMenu = (e)=>{
        console.log(e.key);
        switch(e.key)
        {
            case 'chamado_menu':
                window.location = '/chamados';
                break;
            
            case 'departamento_menu':
                window.location = '/departamentos';
                break;
            
            case 'user_menu':
                window.location = '/usuarios';
                break;
            
            
        }
    }

    return (
        <nav>
            <Menu
                items={itens_menu}
                mode='inline'
                onClick={handleMenu}
            />
        </nav>
    );
}


export default MenuBar;