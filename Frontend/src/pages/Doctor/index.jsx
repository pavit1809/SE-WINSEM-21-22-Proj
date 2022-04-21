import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ROOT_URL } from '../../App';
import * as actionTypes from '../../store/actions';
import { Layout, Menu, Avatar, Badge, notification, message } from 'antd';
import {
  FormOutlined,
  BarsOutlined,
  BellOutlined,
  UserOutlined,
  FolderViewOutlined,
  FolderAddOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { CustomLayout, DetailsSection, Heading, ImgWrapper } from './styles';
import ViewAccessRecords from '../../components/ViewAccessRecords';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const DoctorHome = () => {
  const [selectionKey, setKey] = useState('dashboard');
  const [screenView, setScreenView] = useState('cards');
  const [index, setIndex] = useState(0);
  const admin_data = useSelector(state => state.admin_data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async event => {
    const key = event.key;
    setKey(key);
    if (key === 'view') {
      //API to get data to show
    } else if (key === 'logout') {
      logout();
    } else {
      console.log(key);
    }
  };

  const handleView = index => {
    // Handle content show if there is one more level of viewing the records
  };

  const logout = () => {
    //API for logout user
    navigate('/');
  };

  return (
    <CustomLayout>
      <Header className="header">
        <div className="navbar-actions">
          <span className="tab">
            <Avatar className="avatar" size="medium" icon={<UserOutlined />} />
            <span className="Name">User</span>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider collapsible width={250} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            style={{ height: '100%', borderRight: 0 }}
            onSelect={e => getData(e)}
          >
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="view" icon={<FolderViewOutlined />}>
              View Records
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px', backgroundColor: '#DEEAF8' }}>
          {selectionKey === 'dashboard' && (
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
              }}
            >
              <Heading>What We are doing!</Heading>
              <DetailsSection>
                <ImgWrapper>
                  <img src="/images/1.png" alt="details" />
                </ImgWrapper>
                <div class="description">
                  <div class="title">View Records</div>
                  <div class="content">
                    We secure patient's records throughout the viewing process
                    and grant view access to those doctors(certified) only after
                    patient's approval. We hash the records to protect in our
                    database from external attacks and other threats. The
                    doctors can only view and not able to download the original
                    record in any way possible.
                  </div>
                  <div className="price">
                    We provide a secure way to provide access to others for
                    viewing your records privately!
                  </div>
                </div>
              </DetailsSection>
            </Content>
          )}
          {selectionKey === 'view' && (
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <ViewAccessRecords handleView={handleView}/>
            </Content>
          )}
        </Layout>
      </Layout>
    </CustomLayout>
  );
};

export default DoctorHome;
