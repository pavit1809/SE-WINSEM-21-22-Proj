import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, LeftOutlined, PlusOutlined } from "@ant-design/icons";
import Axios from "axios";
import { ROOT_URL } from "../../App";
import {
  Avatar,
  Button,
  Modal,
  notification,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import * as actionTypes from "../../store/actions";

const { Option } = Select;

const ViewActivity = ({ handleView }) => {
  const [editRecordData, setRecords] = useState([]);
  const [addUserDetails, setUsers] = useState([]);
  const [addedUser, setAddedUser] = useState([]);
  const { role, token } = useSelector((state) => state.userDetails);
  const { id: documentId } = useSelector((state) => state.recordDetails);
  const dispatch = useDispatch();

  const getActivity = async () => {
    //API Call to get Edit Activity
    const editDetails = { role, token, id: documentId };
    await Axios.post(`${ROOT_URL}/user/document/history`, editDetails)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          console.log(res.data);
          setRecords(res.data);
          notification.success({
            message: `Success`,
            description: res.data.message,
            placement: "bottomLeft",
          });
        } else {
          notification.error({
            message: `Error`,
            description: res.data.message,
            placement: "bottomLeft",
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "profilePictureUrl",
      key: "profilePictureUrl",
      render: (profilePictureUrl) => <Avatar src={profilePictureUrl} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => name,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => email || "--",
    },
    {
      title: "Access Time",
      dataIndex: "accessTime",
      key: "accessTime",
      render: (accessTime) => accessTime || "--",
    },
  ];

  useEffect(() => {
    getActivity();
  }, []);
  return (
    <>
      <Table columns={columns} dataSource={editRecordData} />
      <Tooltip title="Back">
        <Button
          type="primary"
          shape="circle"
          icon={<LeftOutlined />}
          size="large"
          onClick={() => handleView("parent")}
          style={{ marginTop: "8px" }}
        />
      </Tooltip>
    </>
  );
};

export default ViewActivity;
