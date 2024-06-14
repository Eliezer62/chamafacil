import React, {useState} from 'react';
import { Layout, Breadcrumb, theme }
from 'antd';
import MenuBar from './MenuBar';

const { Header, Content, Footer, Sider } = Layout;

const LayoutBasico = (props) => {

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    return (
        <div className='p-0 m-0'>
            <Layout style={{ minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <MenuBar/>
                </Sider>
                <Layout>
                    <Content style={{ padding: '25px' }} className='w-100'>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        
                    </Content>
                </Layout>
            </Layout>
        </div>

    );    
}

export default LayoutBasico;