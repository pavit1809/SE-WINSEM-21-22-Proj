import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, LeftOutlined, PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { ROOT_URL } from '../../App';
import {
  Avatar,
  Button,
  Modal,
  notification,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';
import * as actionTypes from '../../store/actions';

const { Option } = Select;

const EditAccess = ({ handleView }) => {
  const [editRecordData, setRecords] = useState([]);
  const [addUserDetails, setUsers] = useState([]);
  const [addedUser, setAddedUser] = useState([]);
  const { role, token } = useSelector(state => state.userDetails);
  const { id: documentId } = useSelector(state => state.recordDetails);
  const dispatch = useDispatch();

  const getEditActivity = async () => {
    //API Call to get Edit Activity
    const editDetails = { role, token, id: documentId };
    await Axios.post(`${ROOT_URL}/user/document/acl`, editDetails)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          setRecords(res.data);
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
  };

  const deleteRecord = async record => {
    // API to delete user
    const deleteDetails = { role, token, id: record?.id, documentId };
    await Axios.post(`${ROOT_URL}/user/document/acl/delete-user`, deleteDetails)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          notification.success({
            message: `Success`,
            description: 'Deleted User successfully',
            placement: 'bottomLeft',
          });
          getEditActivity();
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
  };

  const triggerAddAccess = async () => {
    const authDetails = { role, token, documentId };
    // API to get user details
    await Axios.post(
      `${ROOT_URL}/user/document/acl/add-user-requisites`,
      authDetails
    )
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          setUsers(res.data);
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
  };

  const addAccess = async () => {
    const addDetails = { role, token, id: addedUser, documentId };
    await Axios.post(`${ROOT_URL}/user/document/acl/add-user`, addDetails)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          notification.success({
            message: `Success`,
            description: 'Added user successfully',
            placement: 'bottomLeft',
          });
          setUsers([])
          getEditActivity();
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
  };
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'profilePictureUrl',
      key: 'profilePictureUrl',
      render: profilePictureUrl => <Avatar src={profilePictureUrl} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: name => name,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: email => email || '--',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'designation',
      render: designation => designation || '--',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => deleteRecord(record)}>
            <Tooltip style={{ cursor: 'pointer' }} title="Delete Record">
              <DeleteOutlined />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getEditActivity();
  }, []);
  return (
    <>
      <Tooltip title="Add Access">
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
          onClick={triggerAddAccess}
          style={{ marginRight: '8px', marginBottom: '8px' }}
        />
      </Tooltip>
      {addUserDetails.length > 0 && (
        <>
          <Select
            placeholder="Select the user to add"
            style={{ width: '550px', fontSize: '1.5vh', marginRight: '8px' }}
            value={addedUser}
            onChange={e => setAddedUser(e)}
            allowClear
          >
            {addUserDetails.map(({ name, id }) => (
              <Option value={id}>{name}</Option>
            ))}
          </Select>
          <Button onClick={addAccess}>Add</Button>
        </>
      )}
      <Table columns={columns} dataSource={editRecordData} />
      <Tooltip title="Back">
        <Button
          type="primary"
          shape="circle"
          icon={<LeftOutlined />}
          size="large"
          onClick={() => handleView('parent')}
          style={{ marginTop: '8px' }}
        />
      </Tooltip>
    </>
  );
};

export default EditAccess;
