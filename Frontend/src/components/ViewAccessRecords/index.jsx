import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  FundViewOutlined,
} from "@ant-design/icons";
import Axios from "axios";
import { ROOT_URL } from "../../App";
import { Modal, notification, Select, Space, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DetailsSection, PDFContainer } from "./styles";
import * as actionTypes from "../../store/actions";
import { Document, Page, pdfjs } from "react-pdf";

const { Option } = Select;

const ViewAccessRecords = ({ handleView }) => {
  const [recordData, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentLink, setCurrentLink] = useState(false);
  const { role, token } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();

  const getRecords = async () => {
    //API to get data
    const userDetails = { role, token };
    await Axios.post(`${ROOT_URL}/doctor/documents`, userDetails)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          console.log(res.data);
          setData(res.data);
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
  const openPDF = async (downloadLink, id) => {
    //Call API for feeding logs
    const userDetails = { role, token, id };
    await Axios.post(`${ROOT_URL}/document/fetch`, userDetails)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
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

    // Open Modal to view pdf
    setModalVisible(true);
    setCurrentLink(downloadLink);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category || "Others",
    },
    {
      title: "Owner Name",
      dataIndex: "ownerName",
      key: "ownerName",
      render: (ownerName) => ownerName || "--",
    },
    {
      title: "Owner Email",
      dataIndex: "ownerEmail",
      key: "ownerEmail",
      render: (ownerEmail) => ownerEmail || "--",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        const { downloadLink, id } = record || {};
        return (
          <Space size="middle">
            <a onClick={() => openPDF(downloadLink, id)}>
              <Tooltip style={{ cursor: "pointer" }} title="View Record">
                <FundViewOutlined />
              </Tooltip>
            </a>
          </Space>
        );
      },
    },
  ];

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const url =
    "https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf";

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
      <Modal
        title={null}
        visible={isModalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <embed
          src={currentLink + "#toolbar=0"}
          type="application/pdf"
          height={700}
          width={500}
        />
        {/* <object data={`${currentLink}#toolbar=0}`} width={1200} height={1200}></object> */}
        {/* <Document file={{url:url}} onContextMenu={(e) => e.preventDefault()}>
          <Page pageNumber={1} />
        </Document> */}
      </Modal>
    </>
  );
};

export default ViewAccessRecords;
