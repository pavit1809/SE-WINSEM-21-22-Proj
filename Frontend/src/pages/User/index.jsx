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
import AddRecords from '../../components/AddRecords';
import ViewRecords from '../../components/ViewRecords';
import EditAccess from '../../components/EditAccess';
import ViewActivity from '../../components/ViewActivity';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const UserHome = () => {
  const [selectionKey, setKey] = useState('dashboard');
  const [screenView, setScreenView] = useState('cards');
  const [index, setIndex] = useState(0);
  const admin_data = useSelector(state => state.admin_data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role, token } = useSelector(state => state.userDetails);

  const getData = async event => {
    const key = event.key;
    setKey(key);
    if (key === 'view') {
      //API to get data to show
    } else if (key === 'logout') {
      logout();
    } else {
    }
  };

  const handleView = (option) => {
    // Handle content show if there is one more level of viewing the records
    if(option === 'edit'){
      setKey('editAccess');
    }
    else if (option === 'view'){
      setKey('viewActivity');
    }
    else{
      setKey('view')
    }
  };

  const handleAdd = async values => {
    //API to add the record
    const { file, category } = values || {};
    let formData = new FormData();
    formData.append('file', file?.fileList[0].originFileObj);
    formData.append('category', category);
    formData.append('role', role);
    formData.append('token', token);
    await Axios.post(`${ROOT_URL}/document/upload-mfile`, formData)
      .then(res => {
        if (res.status === 201) {
          console.log(res.data);
          notification.success({
            message: `Success`,
            description: res.data.message,
            placement: 'bottomLeft',
          });
        } else {
          notification.error({
            message: `Error`,
            description: res.data.message,
            placement: 'bottomLeft',
          });
        }
      })
      .catch(err => {
        console.log('err', err);
      });
    message.success('Select View records to view your added record.');
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
            <Menu.Item key="add" icon={<FolderAddOutlined />}>
              Add Records
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
                    We secure your records throughout the process of providing
                    access to other individuals with not risking your record
                    integrity and privacy.
                  </div>
                  <div className="price">
                    We provide a secure way to provide access to others for
                    viewing your records privately!
                  </div>
                </div>
              </DetailsSection>
              <DetailsSection>
                <div class="description" style={{ textAlign: 'right' }}>
                  <div class="title">Add Records</div>
                  <div class="content">
                    We guarantee easy addition and upload of records into our
                    well designed and secure environment where we triple check
                    each step from uploading the docs to saving it in our
                    database excluded from any risk of data inconsistency,
                    threats and hacks achieved through a combination of methods
                    like hashing and authorization.
                  </div>
                  <div className="price">
                    Add records by just a few click and enter a private vault we
                    made just for you!
                  </div>
                </div>
                <ImgWrapper>
                  <img src="/images/2.webp" alt="details" />
                </ImgWrapper>
              </DetailsSection>
            </Content>
          )}

          {/* ----------- View Records -------------- */}

          {selectionKey === 'view' && (
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <ViewRecords handleView={handleView} />
            </Content>
          )}

          {selectionKey === 'editAccess' && (
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <EditAccess handleView={handleView} />
            </Content>
          )}

          {selectionKey === 'viewActivity' && (
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <ViewActivity handleView={handleView} />
            </Content>
          )}

          {/* ----------- Add Records -------------- */}

          {selectionKey === 'add' && (
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
              <AddRecords handleAdd={handleAdd} />
            </Content>
          )}
        </Layout>
      </Layout>
    </CustomLayout>
  );
};

export default UserHome;
