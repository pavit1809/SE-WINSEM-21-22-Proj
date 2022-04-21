import React, { useEffect, useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  FundViewOutlined,
} from '@ant-design/icons';
import Axios from 'axios';
import { ROOT_URL } from '../../App';
import { notification, Select, Space, Table, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DetailsSection } from './styles';
import * as actionTypes from '../../store/actions';

const { Option } = Select;

const ViewRecords = ({ handleView }) => {
  const [recordData, setData] = useState([]);
  const { role, token } = useSelector(state => state.userDetails);
  const dispatch = useDispatch();

  const getRecords = async () => {
    //API to get data
    const userDetails = { role, token };
    await Axios.post(`${ROOT_URL}/user/documents`, userDetails)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          console.log(res.data);
          setData(res.data);
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
    const deleteDetails = { role, token, id: record?.id };
    await Axios.post(`${ROOT_URL}/user/document/delete`, deleteDetails)
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          getRecords();
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

  const viewActivity = async record => {
    dispatch({
      type: actionTypes.CHANGE_RECORD,
      recordDetails: record,
    });
    handleView('view');
  };

  const editAccess = async record => {
    dispatch({
      type: actionTypes.CHANGE_RECORD,
      recordDetails: record,
    });
    handleView('edit');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => {
        const { downloadLink } = record;
        return (
          <a href={downloadLink} target="_blank" rel="noreferrer">
            {name}
          </a>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: category => category || 'Others',
    },
    {
      title: 'Upload Time',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
      render: uploadTime => uploadTime || '--',
    },
    {
      title: 'Last Modified Access',
      dataIndex: 'aclModifiedAt',
      key: 'aclModifiedAt',
      render: aclModifiedAt => aclModifiedAt || '--',
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => viewActivity(record)}>
            <Tooltip style={{ cursor: 'pointer' }} title="View Activity">
              <FundViewOutlined />
            </Tooltip>
          </a>
          <a onClick={() => deleteRecord(record)}>
            <Tooltip style={{ cursor: 'pointer' }} title="Delete Record">
              <DeleteOutlined />
            </Tooltip>
          </a>
          <a onClick={() => editAccess(record)}>
            <Tooltip style={{ cursor: 'pointer' }} title="Edit Access">
              <EditOutlined />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getRecords();
  }, []);
  return (
    <>
      <DetailsSection>
        <div className="description">
          <div className="title">View Records</div>
          <div className="price">
            We provide a secure way to provide access to others for viewing your
            records privately!
          </div>
        </div>
      </DetailsSection>
      <Table columns={columns} dataSource={recordData} />
    </>
  );
};

export default ViewRecords;
